import { useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'

import { PufziAuthHeader } from '../../../components/PufziAuthHeader/PufziAuthHeader'
import { PufziAuthLayout } from '../../../components/PufziAuthLayout/PufziAuthLayout'
import { PufziSecureText } from '../../../components/PufziSecureText/PufziSecureText'
import type { RootStackParamList } from '../../../navigation/navigationTypes'
import { signInWithGoogle } from '../../../services/auth/googleAuthService'
import { useAuth } from '../../../services/auth/hooks/useAuth'
import { useGoogleAuth } from '../../../services/auth/hooks/useGoogleAuth'

import { LoginForm } from '../components/LoginForm'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

export const LoginScreen = ({ navigation }: Props) => {
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
    <PufziAuthLayout variant="login">
      <PufziAuthHeader title={t('title')} description={t('description')} align="left" />

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

      <PufziSecureText text={t('secureLogin')} />
    </PufziAuthLayout>
  )
}
