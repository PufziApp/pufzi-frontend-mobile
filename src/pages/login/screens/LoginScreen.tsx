import { useEffect, useRef, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Animated, Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { Icon, Text, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import { AppControls } from '../../../components/AppControls/AppControls'
import type { RootStackParamList } from '../../../navigation/navigationTypes'
import { signInWithGoogle } from '../../../services/auth/googleAuthService'
import { useGoogleAuth } from '../../../services/auth/hooks/useGoogleAuth'
import { useAuth } from '../../../services/auth/hooks/useAuth'

import { LoginForm } from '../components/LoginForm'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

export const LoginScreen = ({ navigation }: Props) => {
  const theme = useTheme()
  const { t } = useTranslation('Login')
  const { setAuthSession } = useAuth()

  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const googleLoginMutation = useGoogleAuth()

  const formAnim = useRef(new Animated.Value(0)).current
  const exclaimPulse = useRef(new Animated.Value(0)).current
  const pawWiggle = useRef(new Animated.Value(0)).current
  const badgePulse = useRef(new Animated.Value(0)).current
  const pawFloat1 = useRef(new Animated.Value(0)).current
  const pawFloat2 = useRef(new Animated.Value(0)).current
  const pawFloat3 = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(formAnim, {
      toValue: 1,
      duration: 500,
      delay: 220,
      useNativeDriver: true,
    }).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(exclaimPulse, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(exclaimPulse, {
          toValue: 0,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.delay(900),
      ]),
    ).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(pawWiggle, {
          toValue: 1,
          duration: 550,
          useNativeDriver: true,
        }),
        Animated.timing(pawWiggle, {
          toValue: -1,
          duration: 550,
          useNativeDriver: true,
        }),
        Animated.timing(pawWiggle, {
          toValue: 0,
          duration: 550,
          useNativeDriver: true,
        }),
        Animated.delay(1400),
      ]),
    ).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(badgePulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(badgePulse, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    ).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(pawFloat1, {
          toValue: 1,
          duration: 3200,
          useNativeDriver: true,
        }),
        Animated.timing(pawFloat1, {
          toValue: 0,
          duration: 3200,
          useNativeDriver: true,
        }),
      ]),
    ).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(pawFloat2, {
          toValue: 1,
          duration: 3900,
          useNativeDriver: true,
        }),
        Animated.timing(pawFloat2, {
          toValue: 0,
          duration: 3900,
          useNativeDriver: true,
        }),
      ]),
    ).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(pawFloat3, {
          toValue: 1,
          duration: 4400,
          useNativeDriver: true,
        }),
        Animated.timing(pawFloat3, {
          toValue: 0,
          duration: 4400,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [badgePulse, exclaimPulse, formAnim, pawFloat1, pawFloat2, pawFloat3, pawWiggle])

  const exclaimOpacity = exclaimPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 1],
  })

  const pawRotate = pawWiggle.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-22deg', '-8deg', '6deg'],
  })

  const badgeOpacity = badgePulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 1],
  })

  const badgeScale = badgePulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1.15],
  })

  const formTranslateY = formAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [22, 0],
  })

  const paw1TranslateY = pawFloat1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -14],
  })

  const paw1Rotate = pawFloat1.interpolate({
    inputRange: [0, 1],
    outputRange: ['-18deg', '-8deg'],
  })

  const paw2TranslateY = pawFloat2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  })

  const paw2Rotate = pawFloat2.interpolate({
    inputRange: [0, 1],
    outputRange: ['18deg', '8deg'],
  })

  const paw3TranslateY = pawFloat3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  })

  const paw3Rotate = pawFloat3.interpolate({
    inputRange: [0, 1],
    outputRange: ['-10deg', '4deg'],
  })

  const titleRaw = t('title')
  const hasExclaim = titleRaw.trim().endsWith('!')
  const titleBase = hasExclaim ? titleRaw.trim().slice(0, -1) : titleRaw

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
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 115,
          left: -8,
          opacity: 0.1,
          transform: [{ translateY: paw1TranslateY }, { rotate: paw1Rotate }],
        }}
      >
        <Icon source="paw" size={70} color={theme.colors.primary} />
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 300,
          right: -10,
          opacity: 0.08,
          transform: [{ translateY: paw2TranslateY }, { rotate: paw2Rotate }],
        }}
      >
        <Icon source="paw" size={58} color={theme.colors.primary} />
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: 80,
          left: 14,
          opacity: 0.07,
          transform: [{ translateY: paw3TranslateY }, { rotate: paw3Rotate }],
        }}
      >
        <Icon source="paw" size={48} color={theme.colors.primary} />
      </Animated.View>

      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop: 52,
            paddingBottom: 32,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              alignItems: 'flex-end',
              marginBottom: 12,
            }}
          >
            <AppControls />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                alignItems: 'center',
                marginBottom: 32,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={require('../../../assets/LogoPufziColor.png')}
                  resizeMode="contain"
                  style={{
                    width: 82,
                    height: 82,
                  }}
                />

                <Text
                  style={{
                    color: theme.colors.onBackground,
                    fontSize: 40,
                    lineHeight: 46,
                    fontWeight: '900',
                    letterSpacing: -1.5,
                    marginLeft: -3,
                  }}
                >
                  {t('brandName')}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: theme.colors.primaryContainer,
                  borderRadius: 20,
                  paddingHorizontal: 14,
                  paddingVertical: 7,
                  marginTop: 6,
                }}
              >
                <Animated.View
                  style={{
                    opacity: badgeOpacity,
                    transform: [{ scale: badgeScale }],
                  }}
                >
                  <Icon source="content-cut" size={16} color={theme.colors.primary} />
                </Animated.View>

                <Text
                  variant="bodyMedium"
                  style={{
                    color: theme.colors.primary,
                    fontWeight: '700',
                    marginLeft: 7,
                  }}
                >
                  {t('groomingBadge')}
                </Text>

                <Animated.View
                  style={{
                    marginLeft: 7,
                    opacity: badgeOpacity,
                    transform: [{ scale: badgeScale }],
                  }}
                >
                  <Icon source="paw" size={14} color={theme.colors.primary} />
                </Animated.View>
              </View>
            </View>

            <Animated.View
              style={{
                opacity: formAnim,
                transform: [{ translateY: formTranslateY }],
              }}
            >
              <View
                style={{
                  marginBottom: 28,
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <Text
                    variant="headlineMedium"
                    style={{
                      color: theme.colors.onBackground,
                      fontWeight: '900',
                      letterSpacing: -0.6,
                      textAlign: 'center',
                    }}
                  >
                    {titleBase}

                    {hasExclaim && (
                      <Animated.Text
                        style={{
                          color: theme.colors.primary,
                          opacity: exclaimOpacity,
                          fontWeight: '900',
                        }}
                      >
                        !
                      </Animated.Text>
                    )}
                  </Text>

                  <Animated.View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                      transform: [{ rotate: pawRotate }],
                    }}
                  >
                    <Icon source="paw" size={21} color={theme.colors.primary} />

                    <View
                      style={{
                        marginLeft: -2,
                        marginTop: -14,
                        transform: [{ rotate: '18deg' }],
                      }}
                    >
                      <Icon source="paw" size={14} color={theme.colors.primary} />
                    </View>
                  </Animated.View>
                </View>

                <Text
                  variant="bodyLarge"
                  style={{
                    color: theme.colors.onSurfaceVariant,
                    lineHeight: 24,
                    marginTop: 8,
                    maxWidth: 360,
                    textAlign: 'center',
                  }}
                >
                  {t('description')}
                </Text>
              </View>

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

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 24,
                }}
              >
                <Icon
                  source="shield-check-outline"
                  size={16}
                  color={theme.colors.onSurfaceVariant}
                />

                <Text
                  variant="bodySmall"
                  style={{
                    color: theme.colors.onSurfaceVariant,
                    marginLeft: 6,
                  }}
                >
                  {t('secureLogin')}
                </Text>
              </View>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}
