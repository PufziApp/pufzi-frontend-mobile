import { useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useController, useForm, useWatch, type Control } from 'react-hook-form'
import { Keyboard, View, useWindowDimensions } from 'react-native'
import { Text, TextInput, useTheme, type TextInputProps } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import { GoogleAuthButton } from '../../../components/GoogleAuthButton/GoogleAuthButton'
import { PufziButton } from '../../../components/PufziButton/PufziButton'
import { PufziDividerText } from '../../../components/PufziDividerText/PufziDividerText'
import { PufziFormAlert } from '../../../components/PufziFormAlert/PufziFormAlert'
import { PufziFormFooter } from '../../../components/PufziFormFooter/PufziFormFooter'
import { PufziTextInput } from '../../../components/PufziTextInput/PufziTextInput'

import { useRegister } from '../hooks/useRegister'
import { registerSchema, type RegisterFormValues } from '../schemas/registerSchema'
import type { RegisterRequest } from '../types/registerTypes'

import { PasswordRequirements } from './PasswordRequirements'
import { PufziTermsConsent } from '../../../components/PufziTermsConsent/PufziTermsConsent'

type Props = {
  onLogin: () => void
  onGoogleRegister: () => void
  isGoogleLoading: boolean
  onRegisterSuccess: (email: string) => void
}

type FieldName = Exclude<keyof RegisterFormValues, 'acceptedTerms'>

type RegisterFieldProps = {
  control: Control<RegisterFormValues>
  name: FieldName
  label: string
  icon: string
  disabled: boolean
  onEdit: () => void
  isPassword?: boolean
  autoComplete?: TextInputProps['autoComplete']
  autoCapitalize?: TextInputProps['autoCapitalize']
  keyboardType?: TextInputProps['keyboardType']
}

const RegisterField = ({
  control,
  name,
  label,
  icon,
  disabled,
  onEdit,
  isPassword = false,
  autoComplete,
  autoCapitalize = 'none',
  keyboardType,
}: RegisterFieldProps) => {
  const theme = useTheme()
  const { t } = useTranslation('Register')

  const {
    field: { onChange, onBlur, value },
    fieldState: { error, isTouched },
    formState: { isSubmitted },
  } = useController({ control, name })

  const showError = Boolean(error && (isTouched || isSubmitted))

  return (
    <View style={{ gap: 6 }}>
      <Text
        style={{
          fontSize: 13,
          fontWeight: '600',
          color: theme.colors.onSurface,
        }}
      >
        {label}
      </Text>

      <PufziTextInput
        appearance="auth"
        placeholder={label}
        accessibilityLabel={label}
        value={value}
        onChangeText={text => {
          onEdit()
          onChange(text)
        }}
        onBlur={onBlur}
        disabled={disabled}
        isPassword={isPassword}
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        autoCorrect={false}
        error={showError}
        errorMessage={showError && error?.message ? t(error.message) : undefined}
        left={<TextInput.Icon icon={icon} color={theme.colors.onSurfaceVariant} />}
      />
    </View>
  )
}

export const RegisterForm = ({
  onLogin,
  onGoogleRegister,
  isGoogleLoading,
  onRegisterSuccess,
}: Props) => {
  const { t } = useTranslation('Register')
  const { width, fontScale } = useWindowDimensions()
  const registerMutation = useRegister()
  const submitting = useRef(false)
  const [hasRequestError, setHasRequestError] = useState(false)

  const { control, handleSubmit } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema()),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: false,
    },
  })

  const password = useWatch({ control, name: 'password' })
  const acceptedTerms = useWatch({ control, name: 'acceptedTerms' })

  const busy = registerMutation.isPending || isGoogleLoading
  const stackNames = width < 380 || fontScale > 1.2

  const clearRequestError = () => setHasRequestError(false)

  const onSubmit = (data: RegisterFormValues) => {
    if (submitting.current || busy || !data.acceptedTerms) {
      return
    }

    submitting.current = true
    setHasRequestError(false)
    Keyboard.dismiss()

    const payload: RegisterRequest = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }

    registerMutation.mutate(payload, {
      onSuccess: () => {
        onRegisterSuccess(data.email)
      },
      onError: () => {
        setHasRequestError(true)
      },
      onSettled: () => {
        submitting.current = false
      },
    })
  }

  const handleRegister = () => {
    if (!acceptedTerms || busy || submitting.current) {
      return
    }

    handleSubmit(onSubmit)()
  }

  const handleGoogleRegister = () => {
    if (!acceptedTerms || busy || submitting.current) {
      return
    }

    setHasRequestError(false)
    onGoogleRegister()
  }

  return (
    <View style={{ gap: 16 }}>
      <View
        style={{
          flexDirection: stackNames ? 'column' : 'row',
          gap: 12,
        }}
      >
        <View style={{ flex: 1 }}>
          <RegisterField
            control={control}
            name="firstName"
            label={t('firstName')}
            icon="account-outline"
            autoComplete="given-name"
            autoCapitalize="words"
            disabled={busy}
            onEdit={clearRequestError}
          />
        </View>

        <View style={{ flex: 1 }}>
          <RegisterField
            control={control}
            name="lastName"
            label={t('lastName')}
            icon="account-outline"
            autoComplete="family-name"
            autoCapitalize="words"
            disabled={busy}
            onEdit={clearRequestError}
          />
        </View>
      </View>

      <RegisterField
        control={control}
        name="email"
        label={t('email')}
        icon="email-outline"
        keyboardType="email-address"
        autoComplete="email"
        disabled={busy}
        onEdit={clearRequestError}
      />

      <RegisterField
        control={control}
        name="password"
        label={t('password')}
        icon="lock-outline"
        autoComplete="new-password"
        isPassword
        disabled={busy}
        onEdit={clearRequestError}
      />

      <PasswordRequirements password={password} />

      <RegisterField
        control={control}
        name="confirmPassword"
        label={t('confirmPassword')}
        icon="lock-check-outline"
        autoComplete="new-password"
        isPassword
        disabled={busy}
        onEdit={clearRequestError}
      />

      <Controller
        control={control}
        name="acceptedTerms"
        render={({ field: { value, onChange } }) => (
          <PufziTermsConsent
            checked={value}
            onChange={onChange}
            label={t('terms.label')}
            hint={t('terms.hint')}
            disabled={busy}
          />
        )}
      />

      {hasRequestError && (
        <PufziFormAlert title={t('errors.title')} message={t('errors.description')} />
      )}

      <PufziButton
        label={t('register')}
        onPress={handleRegister}
        loading={registerMutation.isPending}
        disabled={!acceptedTerms || busy}
      />

      <PufziDividerText text={t('or')} />

      <GoogleAuthButton
        onPress={handleGoogleRegister}
        loading={isGoogleLoading}
        disabled={!acceptedTerms || busy}
      />

      <PufziFormFooter text={t('alreadyHaveAccount')} actionText={t('login')} onPress={onLogin} />
    </View>
  )
}
