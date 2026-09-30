import { useEffect, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Animated, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { GoogleAuthButton } from '../../../components/GoogleAuthButton/GoogleAuthButton'
import { PufziButton } from '../../../components/PufziButton/PufziButton'
import { PufziDividerText } from '../../../components/PufziDividerText/PufziDividerText'
import { PufziFormFooter } from '../../../components/PufziFormFooter/PufziFormFooter'
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

  useEffect(() => {
    const animation = Animated.stagger(
      90,
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
        <PufziButton
          label={t('register')}
          onPress={handleRegister}
          loading={registerMutation.isPending}
          disabled={registerMutation.isPending}
        />
      </Animated.View>

      <Animated.View style={enterStyle(itemAnims[5])}>
        <PufziDividerText text={tCommon('or')} />
      </Animated.View>

      <Animated.View style={enterStyle(itemAnims[5])}>
        <GoogleAuthButton
          onPress={onGoogleRegister}
          loading={isGoogleLoading}
          disabled={isGoogleLoading}
        />
      </Animated.View>

      <Animated.View style={enterStyle(itemAnims[6])}>
        <PufziFormFooter text={t('alreadyHaveAccount')} actionText={t('login')} onPress={onLogin} />
      </Animated.View>
    </View>
  )
}
