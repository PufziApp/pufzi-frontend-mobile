import type { ReactNode } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { AppControls } from '../AppControls/AppControls'
import { PufziAuthBackground } from '../PufziAuthBackground/PufziAuthBackground'
import { orangeColors } from '../../theme/colors'

type Props = {
  children: ReactNode
  variant?: 'plain' | 'login' | 'register'
}

const HERO_IMAGES = {
  login: {
    orange: {
      light: require('../../assets/auth/login-hero-orange-light.png'),
      dark: require('../../assets/auth/login-hero-orange-dark.png'),
    },
    sage: {
      light: require('../../assets/auth/login-hero-green-light.png'),
      dark: require('../../assets/auth/login-hero-green-dark.png'),
    },
  },
  register: {
    orange: {
      light: require('../../assets/auth/register-hero-orange-light.png'),
      dark: require('../../assets/auth/register-hero-orange-dark.png'),
    },
    sage: {
      light: require('../../assets/auth/register-hero-green-light.png'),
      dark: require('../../assets/auth/register-hero-green-dark.png'),
    },
  },
} as const

const getThemeColor = (primary: string) => {
  if (primary === orangeColors.light.primary || primary === orangeColors.dark.primary) {
    return 'orange'
  }

  return 'sage'
}

export const PufziAuthLayout = ({ children, variant = 'plain' }: Props) => {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const { width, height } = useWindowDimensions()

  const contentWidth = Math.min(width, 520)
  const heroHeight = Math.max(210, Math.min(contentWidth * 0.78, height * 0.36, 340)) + insets.top

  const themeColor = getThemeColor(theme.colors.primary)
  const themeMode = theme.dark ? 'dark' : 'light'

  if (variant !== 'plain') {
    const heroImage = HERO_IMAGES[variant][themeColor][themeMode]

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.surface,
        }}
      >
        <KeyboardAvoidingView
          style={{
            flex: 1,
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                width: '100%',
                maxWidth: 520,
                alignSelf: 'center',
                flexGrow: 1,
              }}
            >
              <View
                style={{
                  height: heroHeight,
                  backgroundColor: theme.colors.background,
                }}
              >
                <Image
                  source={heroImage}
                  resizeMode="cover"
                  accessible={false}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />

                <View
                  style={{
                    position: 'absolute',
                    top: insets.top + 12,
                    left: 20,
                    right: 20,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 12,
                  }}
                >
                  <View
                    style={{
                      width: 72,
                      height: 80,
                      borderRadius: 22,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: theme.colors.surface,
                      borderWidth: 1,
                      borderColor: theme.colors.outline,
                    }}
                  >
                    <Image
                      source={require('../../assets/LogoPufziColor.png')}
                      resizeMode="contain"
                      accessible
                      accessibilityLabel="Pufzi"
                      style={{
                        width: 62,
                        height: 70,
                      }}
                    />
                  </View>

                  <AppControls compact />
                </View>
              </View>

              <View
                style={{
                  flexGrow: 1,
                  marginTop: -26,
                  borderTopLeftRadius: 32,
                  borderTopRightRadius: 32,
                  paddingHorizontal: 24,
                  paddingTop: 28,
                  paddingBottom: Math.max(insets.bottom + 16, 28),
                  backgroundColor: theme.colors.surface,
                }}
              >
                <View>{children}</View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <PufziAuthBackground />

      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
            <View>{children}</View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}
