import { useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import { AppControls } from '../../../components/AppControls/AppControls'
import type { RootStackParamList } from '../../../navigation/navigationTypes'
import { signInWithGoogle } from '../../../services/auth/googleAuthService'
import { useGoogleAuth } from '../../../services/auth/hooks/useGoogleAuth'
import { useAuth } from '../../../services/auth/hooks/useAuth'

import { LoginForm } from '../components/LoginForm'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

export const LoginScreen = ({ navigation }: Props) => {
  const theme = useTheme()
  const { t } = useTranslation('Login')
  const { setAuthSession } = useAuth()

  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const googleLoginMutation = useGoogleAuth()

  const handleGoogleAuth = async () => {
    try {
      setIsGoogleLoading(true)

      const idToken = await signInWithGoogle()

      if (!idToken) {
        return
      }

      googleLoginMutation.mutate(
        {
          idToken,
        },
        {
          onSuccess: async session => {
            await setAuthSession(session)
          },
        },
      )
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingTop: 48,
          paddingBottom: 32,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            alignItems: 'flex-end',
          }}
        >
          <AppControls />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              alignItems: 'center',
              marginBottom: 32,
            }}
          >
            <Image
              source={require('../../../assets/LogoPufziColor.png')}
              resizeMode="contain"
              style={{
                width: 120,
                height: 120,
              }}
            />
          </View>

          <View
            style={{
              marginBottom: 28,
            }}
          >
            <Text
              variant="headlineMedium"
              style={{
                color: theme.colors.onBackground,
                fontWeight: '800',
              }}
            >
              {t('title')}
            </Text>

            <Text
              variant="bodyLarge"
              style={{
                color: theme.colors.onSurfaceVariant,
                marginTop: 8,
              }}
            >
              {t('description')}
            </Text>
          </View>

          <LoginForm
            onForgotPassword={() => {}}
            onRegister={() => {
              navigation.navigate('Register')
            }}
            onGoogleLogin={handleGoogleAuth}
            isGoogleLoading={isGoogleLoading || googleLoginMutation.isPending}
            onLoginSuccess={async session => {
              await setAuthSession(session)
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
