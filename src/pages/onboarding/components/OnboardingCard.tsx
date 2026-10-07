import { Animated, Text, View } from 'react-native'
import { Icon, type MD3Theme } from 'react-native-paper'

import { COPY, SERVICES } from '../onboarding.constants'
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

export const OnboardingCard = ({
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
      <View style={[styles.card, styles.groomingCard, cardAppearance]}>
        <View style={styles.row}>
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: colors.primaryContainer,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
          >
            <Icon source="paw" size={25} color={colors.primary} />
          </View>

          <View style={styles.cardHeading}>
            <Text style={[styles.cardTitle, strongText]}>{COPY.grooming}</Text>

            <Text style={[styles.cardSubtitle, regularText]}>{COPY.preparing}</Text>
          </View>

          <View
            style={[
              styles.serviceIcon,
              {
                backgroundColor: colors.primaryContainer,
              },
            ]}
          >
            <Icon source="content-cut" size={23} color={colors.primary} />
          </View>
        </View>

        <View
          style={[
            styles.progressTrack,
            {
              backgroundColor: colors.primaryContainer,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.progressFill,
              {
                backgroundColor: colors.primary,
                transform: [
                  {
                    translateX: interpolate(timeline, [100, 1600], [-290, 0]),
                  },
                ],
              },
            ]}
          />
        </View>

        <View style={styles.serviceList}>
          {SERVICES.map((service, index) => (
            <Animated.View
              key={service}
              style={[
                styles.serviceChip,
                {
                  backgroundColor: colors.surface,
                  opacity: appear(timeline, 350 + index * 420, 180),
                  transform: [
                    {
                      translateY: interpolate(
                        timeline,
                        [350 + index * 420, 530 + index * 420],
                        [5, 0],
                      ),
                    },
                  ],
                },
              ]}
            >
              <Icon source="check" size={12} color={colors.primary} />

              <Text style={[styles.chipLabel, strongText]}>{service}</Text>
            </Animated.View>
          ))}
        </View>
      </View>

      <Text style={[styles.sceneTitle, styles.groomingTitle, strongText]}>
        {COPY.groomingTitle}
      </Text>
    </Animated.View>
  )
}
