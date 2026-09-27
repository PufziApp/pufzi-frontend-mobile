import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Animated, Pressable, View } from 'react-native'
import { Button, Checkbox, Divider, Text, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import { PufziTextInput } from '../../../components/PufziTextInput/PufziTextInput'
import { GoogleAuthButton } from '../../../components/GoogleAuthButton/GoogleAuthButton'
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

  // --- Intrare esalonata pe fiecare sectiune a formularului ---
  const itemAnims = useRef([0, 1, 2, 3, 4, 5].map(() => new Animated.Value(0))).current

  useEffect(() => {
    Animated.stagger(
      100,
      itemAnims.map(anim =>
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
          friction: 7,
          tension: 50,
        }),
      ),
    ).start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  // --- Efect de apasare pe butonul principal ---
  const buttonScale = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 40,
      bounciness: 8,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 10,
    }).start()
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
        <Animated.View
          style={{
            transform: [{ scale: buttonScale }],
          }}
        >
          <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={handleLogin}>
            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loginMutation.isPending}
              disabled={loginMutation.isPending}
              buttonColor={theme.colors.primary}
              textColor={theme.colors.surface}
              contentStyle={{
                height: 56,
              }}
              style={{
                borderRadius: 18,
                shadowColor: theme.colors.primary,
                shadowOpacity: 0.35,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 6,
              }}
              labelStyle={{
                fontSize: 15,
                fontWeight: '800',
              }}
            >
              {t('login')}
            </Button>
          </Pressable>
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={[
          enterStyle(itemAnims[4]),
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            marginVertical: 3,
          },
        ]}
      >
        <Divider
          style={{
            flex: 1,
            backgroundColor: theme.colors.outline,
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
            backgroundColor: theme.colors.outline,
          }}
        />
      </Animated.View>

      <Animated.View style={enterStyle(itemAnims[4])}>
        <GoogleAuthButton
          onPress={onGoogleLogin}
          loading={isGoogleLoading}
          disabled={isGoogleLoading}
        />
      </Animated.View>

      <Animated.View
        style={[
          enterStyle(itemAnims[5]),
          {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
            marginTop: 4,
          },
        ]}
      >
        <Text
          variant="bodyMedium"
          style={{
            color: theme.colors.onSurfaceVariant,
          }}
        >
          {t('noAccount')}
        </Text>

        <Pressable
          onPress={onRegister}
          style={{
            paddingVertical: 6,
          }}
        >
          <Text
            variant="bodyMedium"
            style={{
              color: theme.colors.primary,
              fontWeight: '800',
            }}
          >
            {t('register')}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  )
}
