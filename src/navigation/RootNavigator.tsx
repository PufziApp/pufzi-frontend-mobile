import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import { LoginScreen } from '../pages/login/screens/LoginScreen'
import { OnboardingScreen } from '../pages/onboarding/screens/OnboardingScreen'
import { RegisterScreen } from '../pages/register/screens/RegisterScreen'
import { ConfirmEmailScreen } from '../pages/confirmEmail/screens/ConfirmEmailScreen'
import { CheckEmailScreen } from '../pages/register/screens/CheckEmailScreen'

import type { RootStackParamList } from './navigationTypes'
import { HomeScreen } from '../pages/home/screens/HomeScreen'

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
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Onboarding">
          {({ navigation }) => <OnboardingScreen onFinished={() => navigation.replace('Login')} />}
        </Stack.Screen>

        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="Register" component={RegisterScreen} />

        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />

        <Stack.Screen name="CheckEmail" component={CheckEmailScreen} />

        <Stack.Screen name="Home">
          {({ navigation }) => (
            <HomeScreen
              onLogout={() => {
                navigation.replace('Login')
              }}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
