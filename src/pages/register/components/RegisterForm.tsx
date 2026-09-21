import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, View } from 'react-native'
import { Button, Divider, Text, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import { GoogleAuthButton } from '../../../components/GoogleAuthButton/GoogleAuthButton'
import { PufziTextInput } from '../../../components/PufziTextInput/PufziTextInput'

import { useRegister } from '../hooks/useRegister'
import { registerSchema, type RegisterFormValues } from '../schemas/registerSchema'

type Props = {
  onLogin: () => void
  onGoogleRegister: () => void
  isGoogleLoading: boolean
  onRegisterSuccess: (email: string) => void
}

export const RegisterForm = ({
  onLogin,
  onGoogleRegister,
  isGoogleLoading,
  onRegisterSuccess,
}: Props) => {
  const theme = useTheme()
  const { t } = useTranslation('Register')
  const { t: tCommon } = useTranslation('Common')

  const registerMutation = useRegister()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema()),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        onRegisterSuccess(data.email)
      },
    })
  }

  const handleRegister = () => {
    handleSubmit(onSubmit)()
  }

  return (
    <View
      style={{
        gap: 16,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <PufziTextInput
                label={t('firstName')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="words"
                errorMessage={errors.firstName?.message}
              />
            )}
          />
        </View>

        <View
          style={{
            flex: 1,
          }}
        >
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <PufziTextInput
                label={t('lastName')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="words"
                errorMessage={errors.lastName?.message}
              />
            )}
          />
        </View>
      </View>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <PufziTextInput
            label={t('email')}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            errorMessage={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <PufziTextInput
            label={t('password')}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            autoCorrect={false}
            isPassword
            errorMessage={errors.password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <PufziTextInput
            label={t('confirmPassword')}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            autoCorrect={false}
            isPassword
            errorMessage={
              errors.confirmPassword?.message === 'passwordsDoNotMatch'
                ? t('passwordsDoNotMatch')
                : errors.confirmPassword?.message
            }
          />
        )}
      />

      <Button
        mode="contained"
        onPress={handleRegister}
        loading={registerMutation.isPending}
        disabled={registerMutation.isPending}
        buttonColor={theme.colors.primary}
        textColor="#FFFFFF"
        contentStyle={{
          height: 56,
        }}
        style={{
          borderRadius: 16,
        }}
        labelStyle={{
          fontSize: 15,
          fontWeight: '700',
        }}
      >
        {t('register')}
      </Button>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          marginVertical: 4,
        }}
      >
        <Divider
          style={{
            flex: 1,
          }}
        />

        <Text
          variant="bodySmall"
          style={{
            color: theme.colors.onSurfaceVariant,
          }}
        >
          {tCommon('or')}
        </Text>

        <Divider
          style={{
            flex: 1,
          }}
        />
      </View>

      <GoogleAuthButton
        onPress={onGoogleRegister}
        loading={isGoogleLoading}
        disabled={isGoogleLoading}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5,
          marginTop: 4,
        }}
      >
        <Text
          variant="bodyMedium"
          style={{
            color: theme.colors.onSurfaceVariant,
          }}
        >
          {t('alreadyHaveAccount')}
        </Text>

        <Pressable onPress={onLogin}>
          <Text
            variant="bodyMedium"
            style={{
              color: theme.colors.primary,
              fontWeight: '700',
            }}
          >
            {t('login')}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}
