import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Animated, Pressable, View } from 'react-native'
import { Checkbox, Text, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import { GoogleAuthButton } from '../../../components/GoogleAuthButton/GoogleAuthButton'
import { PufziButton } from '../../../components/PufziButton/PufziButton'
import { PufziDividerText } from '../../../components/PufziDividerText/PufziDividerText'
import { PufziFormFooter } from '../../../components/PufziFormFooter/PufziFormFooter'
import { PufziTextInput } from '../../../components/PufziTextInput/PufziTextInput'
import type { AuthSession } from '../../../services/auth/types/authTypes'

import { useLogin } from '../hooks/useLogin'
import { loginSchema, type LoginFormValues } from '../schemas/loginSchema'

type Props = {
  onForgotPassword: () => void
  onRegister: () => void
  onGoogleLogin: () => void
  isGoogleLoading: boolean
  onLoginSuccess: (session: AuthSession) => void
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
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema()),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const itemAnims = useRef([0, 1, 2, 3, 4, 5].map(() => new Animated.Value(0))).current

  useEffect(() => {
    const animation = Animated.stagger(
      100,
      itemAnims.map(anim =>
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
          friction: 7,
          tension: 50,
        }),
      ),
    )

    animation.start()

    return () => animation.stop()
  }, [itemAnims])

  const enterStyle = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [22, 0],
        }),
      },
    ],
  })

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: session => {
        onLoginSuccess(session)
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
      <Animated.View style={enterStyle(itemAnims[0])}>
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
      </Animated.View>

      <Animated.View style={enterStyle(itemAnims[1])}>
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
      </Animated.View>

      <Animated.View
        style={[
          enterStyle(itemAnims[2]),
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: -6,
          },
        ]}
      >
        <Controller
          control={control}
          name="rememberMe"
          render={({ field: { onChange, value } }) => (
            <Pressable
              onPress={() => onChange(!value)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: -7,
              }}
            >
              <Checkbox status={value ? 'checked' : 'unchecked'} color={theme.colors.primary} />

              <Text
                variant="bodyMedium"
                style={{
                  color: theme.colors.onSurface,
                }}
              >
                {t('rememberMe')}
              </Text>
            </Pressable>
          )}
        />

        <Pressable
          onPress={onForgotPassword}
          style={{
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
      </Animated.View>

      <Animated.View style={enterStyle(itemAnims[3])}>
        <PufziButton
          label={t('login')}
          onPress={handleLogin}
          loading={loginMutation.isPending}
          disabled={loginMutation.isPending}
        />
      </Animated.View>

      <Animated.View style={enterStyle(itemAnims[4])}>
        <PufziDividerText text={t('or')} />
      </Animated.View>

      <Animated.View style={enterStyle(itemAnims[4])}>
        <GoogleAuthButton
          onPress={onGoogleLogin}
          loading={isGoogleLoading}
          disabled={isGoogleLoading}
        />
      </Animated.View>

      <Animated.View style={enterStyle(itemAnims[5])}>
        <PufziFormFooter text={t('noAccount')} actionText={t('register')} onPress={onRegister} />
      </Animated.View>
    </View>
  )
}
