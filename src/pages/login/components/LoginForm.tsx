import { useRef } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Keyboard, Pressable, View } from 'react-native'
import { Text, TextInput, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import { GoogleAuthButton } from '../../../components/GoogleAuthButton/GoogleAuthButton'
import { PufziButton } from '../../../components/PufziButton/PufziButton'
import { PufziDividerText } from '../../../components/PufziDividerText/PufziDividerText'
import { PufziFormAlert } from '../../../components/PufziFormAlert/PufziFormAlert'
import { PufziFormFooter } from '../../../components/PufziFormFooter/PufziFormFooter'
import { PufziTextInput } from '../../../components/PufziTextInput/PufziTextInput'
import type { AuthSession } from '../../../services/auth/types/authTypes'

import { useLogin } from '../hooks/useLogin'
import { useLoginFeedback } from '../hooks/useLoginFeedback'
import { loginSchema, type LoginFormValues } from '../schemas/loginSchema'

type Props = {
  onForgotPassword: () => void
  onRegister: () => void
  onGoogleLogin: () => void
  isGoogleLoading: boolean
  onLoginSuccess: (session: AuthSession) => void | Promise<void>
}

export const LoginForm = ({
  onForgotPassword,
  onRegister,
  onGoogleLogin,
  isGoogleLoading,
  onLoginSuccess,
}: Props) => {
  const { t } = useTranslation('Login')
  const theme = useTheme()
  const loginMutation = useLogin()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(
      loginSchema({
        emailRequired: t('validation.emailRequired'),
        invalidEmail: t('validation.invalidEmail'),
        passwordTooShort: t('validation.passwordTooShort'),
      }),
    ),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  })

  const email = useWatch({ control, name: 'email' })
  const { feedback, isPaused, remainingSeconds, clearFeedback, recordFailure, recordSuccess } =
    useLoginFeedback(email)
  const submitting = useRef(false)
  const busy = isSubmitting || loginMutation.isPending || isGoogleLoading

  const onSubmit = async (data: LoginFormValues) => {
    if (submitting.current || isGoogleLoading || isPaused) {
      return
    }

    submitting.current = true
    clearFeedback()
    Keyboard.dismiss()

    try {
      const session = await loginMutation.mutateAsync({ ...data, rememberMe: true })
      recordSuccess(data.email)
      try {
        await onLoginSuccess(session)
      } catch {
        recordFailure(undefined, data.email)
      }
    } catch (error: unknown) {
      recordFailure(error, data.email)
    } finally {
      submitting.current = false
    }
  }

  const handleLogin = () => {
    if (!busy && !isPaused && !submitting.current) {
      handleSubmit(onSubmit)()
    }
  }

  const isWarning = feedback?.kind === 'locked' || feedback?.kind === 'rateLimited'

  return (
    <View
      style={{
        gap: 12,
      }}
    >
      <View>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <PufziTextInput
              appearance="auth"
              placeholder={t('email')}
              left={<TextInput.Icon icon="email-outline" color={theme.colors.onSurfaceVariant} />}
              value={value}
              onChangeText={text => {
                clearFeedback()
                onChange(text)
              }}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              disabled={busy}
              accessibilityLabel={t('email')}
              autoComplete="email"
              error={Boolean(errors.email)}
              errorMessage={errors.email?.message}
            />
          )}
        />
      </View>

      <View>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <PufziTextInput
              appearance="auth"
              placeholder={t('password')}
              left={<TextInput.Icon icon="lock-outline" color={theme.colors.onSurfaceVariant} />}
              value={value}
              onChangeText={text => {
                clearFeedback()
                onChange(text)
              }}
              onBlur={onBlur}
              autoCapitalize="none"
              autoCorrect={false}
              isPassword
              disabled={busy}
              accessibilityLabel={t('password')}
              autoComplete="current-password"
              returnKeyType="go"
              onSubmitEditing={handleLogin}
              error={Boolean(errors.password)}
              errorMessage={errors.password?.message}
            />
          )}
        />
      </View>

      <View style={{ alignItems: 'flex-end', marginTop: -8, marginBottom: -4 }}>
        <Pressable
          onPress={onForgotPassword}
          accessibilityRole="button"
          style={{
            minHeight: 44,
            justifyContent: 'center',
            paddingVertical: 8,
          }}
        >
          <Text
            variant="bodyMedium"
            style={{
              color: theme.colors.primary,
              fontWeight: '700',
            }}
          >
            {t('forgotPassword')}
          </Text>
        </Pressable>
      </View>

      {feedback && (
        <PufziFormAlert
          title={t(isWarning ? 'errors.waitTitle' : 'errors.title')}
          message={t(`errors.${feedback.kind}`)}
          tone={isWarning ? 'warning' : 'error'}
        />
      )}

      <View>
        <PufziButton
          label={isPaused ? t('retryIn', { seconds: remainingSeconds }) : t('login')}
          onPress={handleLogin}
          loading={isSubmitting || loginMutation.isPending}
          disabled={busy || isPaused}
        />
      </View>

      <View>
        <PufziDividerText text={t('or')} />
      </View>

      <View>
        <GoogleAuthButton onPress={onGoogleLogin} loading={isGoogleLoading} disabled={busy} />
      </View>

      <View>
        <PufziFormFooter text={t('noAccount')} actionText={t('register')} onPress={onRegister} />
      </View>
    </View>
  )
}
