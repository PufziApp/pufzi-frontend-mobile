import { Animated, Text, View } from 'react-native'
import { Icon, type MD3Theme } from 'react-native-paper'

import { COPY, HOURS } from '../onboarding.constants'
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

export const OnboardingBookingCard = ({
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
      <View style={[styles.card, styles.bookingCard, cardAppearance]}>
        <View style={styles.row}>
          <View
            style={[
              styles.smallAvatar,
              {
                backgroundColor: colors.primaryContainer,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
          >
            <Icon source="paw" size={18} color={colors.primary} />
          </View>

          <View style={styles.cardHeading}>
            <Text style={[styles.salonTitle, strongText]}>{COPY.salon}</Text>

            <Text style={[styles.salonSubtitle, regularText]}>{COPY.service}</Text>
          </View>

          <View
            style={[
              styles.todayBadge,
              {
                backgroundColor: colors.primaryContainer,
              },
            ]}
          >
            <Text
              style={[
                styles.todayText,
                regularText,
                {
                  color: colors.primary,
                },
              ]}
            >
              {COPY.today}
            </Text>
          </View>
        </View>

        <Animated.View
          style={{
            opacity: appear(timeline, 2450, 250),
          }}
        >
          <Text style={[styles.timeLabel, regularText]}>{COPY.chooseTime}</Text>

          <View style={styles.hours}>
            {HOURS.map((hour, index) => (
              <View
                key={hour}
                style={[
                  styles.hour,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.outlineVariant,
                  },
                ]}
              >
                {index === 1 && (
                  <Animated.View
                    style={[
                      styles.fill,
                      {
                        backgroundColor: colors.primary,
                        opacity: appear(timeline, 3450, 350),
                      },
                    ]}
                  />
                )}

                <Text style={[styles.hourText, strongText]}>{hour}</Text>

                {index === 1 && (
                  <Animated.View
                    style={[
                      styles.hourSelected,
                      {
                        opacity: appear(timeline, 3450, 350),
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.hourText,
                        strongText,
                        {
                          color: colors.onPrimary,
                        },
                      ]}
                    >
                      {hour}
                    </Text>
                  </Animated.View>
                )}
              </View>
            ))}
          </View>
        </Animated.View>
      </View>

      <Text style={[styles.sceneTitle, strongText]}>{COPY.bookingTitle}</Text>
    </Animated.View>
  )
}
