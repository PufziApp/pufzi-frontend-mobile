import { Animated, Text, View } from 'react-native'
import { Icon, type MD3Theme } from 'react-native-paper'

import { STEPS } from '../onboarding.constants'
import { styles } from '../onboarding.styles'
import type { OnboardingTextStyle } from '../onboarding.types'

type Props = {
  timeline: Animated.Value
  theme: MD3Theme
  strongText: OnboardingTextStyle
}

const interpolate = (value: Animated.Value, inputRange: number[], outputRange: number[]) =>
  value.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  })

const appear = (value: Animated.Value, start: number, duration = 300) =>
  interpolate(value, [start, start + duration], [0, 1])

const disappear = (value: Animated.Value, start: number, duration = 300) =>
  interpolate(value, [start, start + duration], [1, 0])

export const OnboardingStoryProgress = ({ timeline, theme, strongText }: Props) => {
  const { colors } = theme

  return (
    <Animated.View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        styles.stepper,
        {
          opacity: disappear(timeline, 5400, 350),
        },
      ]}
    >
      <View
        style={[
          styles.stepperLine,
          {
            backgroundColor: colors.outline,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.stepperLineFill,
            {
              backgroundColor: colors.primary,
              transform: [
                {
                  translateX: interpolate(
                    timeline,
                    [0, 2150, 2450, 4450, 4750],
                    [-182, -182, -91, -91, 0],
                  ),
                },
              ],
            },
          ]}
        />
      </View>

      {STEPS.map(step => {
        const active = step.activeAt === 0 ? 1 : appear(timeline, step.activeAt, 250)

        return (
          <View key={step.label} style={styles.step}>
            <View
              style={[
                styles.stepCircle,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.primary,
                },
              ]}
            >
              <Icon source={step.icon} size={18} color={colors.primary} />

              <Animated.View
                style={[
                  styles.activeStep,
                  {
                    backgroundColor: colors.primary,
                    opacity: active,
                  },
                ]}
              >
                <Icon source={step.icon} size={18} color={colors.onPrimary} />
              </Animated.View>
            </View>

            <Text style={[styles.stepLabel, strongText]}>{step.label}</Text>
          </View>
        )
      })}
    </Animated.View>
  )
}
