import { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { ActivityIndicator, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { LoginScreen } from '../pages/login/screens/LoginScreen'
import { OnboardingScreen } from '../pages/onboarding/screens/OnboardingScreen'
import { RegisterScreen } from '../pages/register/screens/RegisterScreen'
import { ConfirmEmailScreen } from '../pages/confirmEmail/screens/ConfirmEmailScreen'
import { CheckEmailScreen } from '../pages/register/screens/CheckEmailScreen'
import { HomeScreen } from '../pages/home/screens/HomeScreen'
import { useAuth } from '../services/auth/hooks/useAuth'
import { preferenceStorage } from '../storage/preferencesStorage'

import type { RootStackParamList } from './navigationTypes'

const Stack = createNativeStackNavigator<RootStackParamList>()

const linking = {
  prefixes: ['pufzi://'],
  config: {
    screens: {
      ConfirmEmail: 'confirm-email/:token',
    },
  },
}

export const RootNavigator = () => {
  const theme = useTheme()
  const { isAuthenticated, isAuthLoading, logout } = useAuth()

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [isOnboardingLoading, setIsOnboardingLoading] = useState(true)

  useEffect(() => {
    const loadOnboardingPreference = async () => {
      try {
        const completed = await preferenceStorage.hasCompletedOnboarding()

        setHasCompletedOnboarding(completed)
      } finally {
        setIsOnboardingLoading(false)
      }
    }

    loadOnboardingPreference()
  }, [])

  if (isAuthLoading || isOnboardingLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    )
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="Home">{() => <HomeScreen onLogout={logout} />}</Stack.Screen>
        ) : (
          <>
            {!hasCompletedOnboarding && (
              <Stack.Screen name="Onboarding">
                {({ navigation }) => (
                  <OnboardingScreen
                    onFinished={() => {
                      setHasCompletedOnboarding(true)
                      navigation.replace('Login')
                    }}
                  />
                )}
              </Stack.Screen>
            )}

            <Stack.Screen name="Login" component={LoginScreen} />

            <Stack.Screen name="Register" component={RegisterScreen} />

            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />

            <Stack.Screen name="CheckEmail" component={CheckEmailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
