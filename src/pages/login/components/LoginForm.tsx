import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pressable, View } from 'react-native'
import { Button, Divider, Text, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import { PufziTextInput } from '../../../components/PufziTextInput/PufziTextInput'
import { GoogleAuthButton } from '../../../components/GoogleAuthButton/GoogleAuthButton'

import { useLogin } from '../hooks/useLogin'
import { loginSchema, type LoginFormValues } from '../schemas/loginSchema'

type Props = {
  onForgotPassword: () => void
  onRegister: () => void
  onGoogleLogin: () => void
  isGoogleLoading: boolean
  onLoginSucess: () => void
}

export const LoginForm = ({
  onForgotPassword,
  onRegister,
  onGoogleLogin,
  isGoogleLoading,
  onLoginSucess,
}: Props) => {
  const { t } = useTranslation('Login')
  const theme = useTheme()
  const loginMutation = useLogin()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema()),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        onLoginSucess()
      },
    })
  }

  const handleLogin = () => {
    handleSubmit(onSubmit)()
  }

  return (
    <View
      style={{
        gap: 16,
      }}
    >
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

      <Pressable
        onPress={onForgotPassword}
        style={{
          alignSelf: 'flex-end',
          marginTop: -6,
        }}
      >
        <Text
          variant="bodyMedium"
          style={{
            color: theme.colors.primary,
            fontWeight: '600',
          }}
        >
          {t('forgotPassword')}
        </Text>
      </Pressable>

      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loginMutation.isPending}
        disabled={loginMutation.isPending}
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
        {t('login')}
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
          {t('or')}
        </Text>

        <Divider
          style={{
            flex: 1,
          }}
        />
      </View>

      <GoogleAuthButton
        onPress={onGoogleLogin}
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
          {t('noAccount')}
        </Text>

        <Pressable onPress={onRegister}>
          <Text
            variant="bodyMedium"
            style={{
              color: theme.colors.primary,
              fontWeight: '700',
            }}
          >
            {t('register')}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}
