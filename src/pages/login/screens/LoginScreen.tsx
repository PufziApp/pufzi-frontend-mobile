import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import { AppControls } from '../../../components/AppControls/AppControls'
import { signInWithGoogle } from '../../../services/auth/googleAuthService'
import type { RootStackParamList } from '../../../navigation/navigationTypes'

import { LoginForm } from '../components/LoginForm'
import { useGoogleAuth } from '../../../services/auth/hooks/useGoogleAuth'
import { useState } from 'react'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

export const LoginScreen = ({ navigation }: Props) => {
  const theme = useTheme()
  const { t } = useTranslation('Login')

  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)

  const googleLoginMutation = useGoogleAuth()

  const handleGoogleAuth = async () => {
    const idToken = await signInWithGoogle()

    try {
      setIsGoogleLoading(true)

      if (!idToken) {
        return
      }

      googleLoginMutation.mutate(
        {
          idToken,
        },
        {
          onSuccess: () => {
            navigation.navigate('Home')
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
            onLoginSucess={() => {
              navigation.navigate('Home')
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
