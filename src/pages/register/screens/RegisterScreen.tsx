import { useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'

import { PufziAuthBrand } from '../../../components/PufziAuthBrand/PufziAuthBrand'
import { PufziAuthHeader } from '../../../components/PufziAuthHeader/PufziAuthHeader'
import { PufziAuthLayout } from '../../../components/PufziAuthLayout/PufziAuthLayout'
import { PufziSecureText } from '../../../components/PufziSecureText/PufziSecureText'
import type { RootStackParamList } from '../../../navigation/navigationTypes'
import { signInWithGoogle } from '../../../services/auth/googleAuthService'
import { useAuth } from '../../../services/auth/hooks/useAuth'
import { useGoogleAuth } from '../../../services/auth/hooks/useGoogleAuth'

import { RegisterForm } from '../components/RegisterForm'

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>

export const RegisterScreen = ({ navigation }: Props) => {
  const { t } = useTranslation('Register')
  const { setAuthSession } = useAuth()

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
          onSuccess: async session => {
            await setAuthSession(session)
          },
        },
      )
    } finally {
      setIsGoogleSigningIn(false)
    }
  }

  return (
    <PufziAuthLayout>
      <PufziAuthBrand brandName={t('brandName')} badgeText={t('groomingBadge')} />

      <PufziAuthHeader title={t('title')} description={t('description')} />

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

      <PufziSecureText text={t('secureRegister')} />
    </PufziAuthLayout>
  )
}
