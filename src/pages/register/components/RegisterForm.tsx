import { useEffect, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Animated, Pressable, View } from 'react-native'
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

  const itemAnims = useRef([0, 1, 2, 3, 4, 5, 6].map(() => new Animated.Value(0))).current
  const buttonScale = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.stagger(
      90,
      itemAnims.map(anim =>
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
          friction: 7,
          tension: 50,
        }),
      ),
    ).start()
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
      </Animated.View>

      <Animated.View style={enterStyle(itemAnims[1])}>
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

      <Animated.View style={enterStyle(itemAnims[2])}>
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

      <Animated.View style={enterStyle(itemAnims[3])}>
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
      </Animated.View>

      <Animated.View style={enterStyle(itemAnims[4])}>
        <Animated.View
          style={{
            transform: [{ scale: buttonScale }],
          }}
        >
          <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={handleRegister}>
            <Button
              mode="contained"
              onPress={handleRegister}
              loading={registerMutation.isPending}
              disabled={registerMutation.isPending}
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
              {t('register')}
            </Button>
          </Pressable>
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={[
          enterStyle(itemAnims[5]),
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
          {tCommon('or')}
        </Text>

        <Divider
          style={{
            flex: 1,
            backgroundColor: theme.colors.outline,
          }}
        />
      </Animated.View>

      <Animated.View style={enterStyle(itemAnims[5])}>
        <GoogleAuthButton
          onPress={onGoogleRegister}
          loading={isGoogleLoading}
          disabled={isGoogleLoading}
        />
      </Animated.View>

      <Animated.View
        style={[
          enterStyle(itemAnims[6]),
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
          {t('alreadyHaveAccount')}
        </Text>

        <Pressable
          onPress={onLogin}
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
            {t('login')}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  )
}
