import { Animated, Text, View } from 'react-native'
import { Icon, type MD3Theme } from 'react-native-paper'

import { CONFIRMATION_BACKGROUND, COPY } from '../onboarding.constants'
import { styles } from '../onboarding.styles'
import type { OnboardingCardAppearance, OnboardingTextStyle } from '../onboarding.types'

type Props = {
  timeline: Animated.Value
  theme: MD3Theme
  cardAppearance: OnboardingCardAppearance
  regularText: OnboardingTextStyle
  strongText: OnboardingTextStyle
  opacity: Animated.AnimatedInterpolation<number>
}

const interpolate = (value: Animated.Value, inputRange: number[], outputRange: number[]) =>
  value.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  })

const appear = (value: Animated.Value, start: number, duration = 300) =>
  interpolate(value, [start, start + duration], [0, 1])

export const OnboardingConfirmationCard = ({
  timeline,
  theme,
  cardAppearance,
  regularText,
  strongText,
  opacity,
}: Props) => {
  const { colors } = theme

  return (
    <Animated.View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        styles.scene,
        {
          opacity,
        },
      ]}
    >
      <View
        style={[
          styles.card,
          styles.confirmationCard,
          cardAppearance,
          {
            borderColor: colors.secondary,
            backgroundColor: CONFIRMATION_BACKGROUND[theme.dark ? 'dark' : 'light'],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.confirmationIcon,
            {
              backgroundColor: colors.secondary,
              transform: [
                {
                  scale: interpolate(timeline, [4450, 4720, 4880], [0.65, 1.08, 1]),
                },
              ],
            },
          ]}
        >
          <Animated.View
            style={{
              opacity: appear(timeline, 4650, 180),
            }}
          >
            <Icon source="check" size={32} color={colors.onSecondary} />
          </Animated.View>
        </Animated.View>

        <Text style={[styles.confirmationTitle, strongText]}>{COPY.confirmed}</Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 6,
          }}
        >
          <Icon source="clock-outline" size={14} color={colors.secondary} />

          <Text
            style={[
              styles.confirmationSubtitle,
              regularText,
              {
                marginTop: 0,
                marginLeft: 5,
              },
            ]}
          >
            {COPY.appointment}
          </Text>
        </View>
      </View>

      <Text style={[styles.sceneTitle, strongText]}>{COPY.confirmedTitle}</Text>
    </Animated.View>
  )
}
