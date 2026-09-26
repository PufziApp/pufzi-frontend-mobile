import { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import { preferenceStorage } from '../../../storage/preferencesStorage'

import { OnboardingSlide } from '../components/OnboardingSlide'

type Props = {
  onFinished: () => void
}

export const OnboardingScreen = ({ onFinished }: Props) => {
  const theme = useTheme()
  const { t } = useTranslation('Onboarding')

  const actionsOpacity = useRef(new Animated.Value(0)).current
  const actionsTranslateY = useRef(new Animated.Value(18)).current

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.delay(1500),

      Animated.parallel([
        Animated.timing(actionsOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),

        Animated.spring(actionsTranslateY, {
          toValue: 0,
          tension: 45,
          friction: 9,
          useNativeDriver: true,
        }),
      ]),
    ])

    animation.start()

    return () => {
      animation.stop()
    }
  }, [actionsOpacity, actionsTranslateY])

  const finish = async () => {
    await preferenceStorage.completeOnboarding()
    onFinished()
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <OnboardingSlide />

      <Animated.View
        style={{
          opacity: actionsOpacity,
          transform: [{ translateY: actionsTranslateY }],
          paddingHorizontal: 24,
          paddingBottom: 32,
        }}
      >
        <Button
          mode="contained"
          onPress={finish}
          buttonColor={theme.colors.primary}
          textColor={theme.colors.surface}
          contentStyle={{
            height: 58,
          }}
          style={{
            borderRadius: 18,
          }}
          labelStyle={{
            fontSize: 16,
            fontWeight: '800',
          }}
        >
          {t('start')}
        </Button>

        <Text
          variant="bodySmall"
          style={{
            color: theme.colors.onSurfaceVariant,
            textAlign: 'center',
            marginTop: 14,
          }}
        >
          {t('welcome.footer')}
        </Text>
      </Animated.View>
    </View>
  )
}
