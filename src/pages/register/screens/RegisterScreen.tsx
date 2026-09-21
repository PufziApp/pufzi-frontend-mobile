import { useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import { AppControls } from '../../../components/AppControls/AppControls'
import type { RootStackParamList } from '../../../navigation/navigationTypes'
import { signInWithGoogle } from '../../../services/auth/googleAuthService'
import { useGoogleAuth } from '../../../services/auth/hooks/useGoogleAuth'

import { RegisterForm } from '../components/RegisterForm'

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>

export const RegisterScreen = ({ navigation }: Props) => {
  const theme = useTheme()
  const { t } = useTranslation('Register')

  const googleAuthMutation = useGoogleAuth()
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false)

  const handleGoogleAuth = async () => {
    if (isGoogleSigningIn) {
      return
    }

    try {
      setIsGoogleSigningIn(true)

      const idToken = await signInWithGoogle()

      if (!idToken) {
        return
      }

      googleAuthMutation.mutate(
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
      setIsGoogleSigningIn(false)
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
            paddingVertical: 24,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Image
              source={require('../../../assets/LogoPufziColor.png')}
              resizeMode="contain"
              style={{
                width: 100,
                height: 100,
              }}
            />
          </View>

          <View
            style={{
              marginBottom: 24,
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

          <RegisterForm
            onLogin={() => {
              navigation.goBack()
            }}
            onGoogleRegister={handleGoogleAuth}
            isGoogleLoading={isGoogleSigningIn || googleAuthMutation.isPending}
            onRegisterSuccess={email => {
              navigation.replace('CheckEmail', { email })
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
