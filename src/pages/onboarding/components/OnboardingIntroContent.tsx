import { Animated, Pressable, Text } from 'react-native'
import type { MD3Theme } from 'react-native-paper'

import { COPY } from '../onboarding.constants'
import { styles } from '../onboarding.styles'
import type { OnboardingTextStyle } from '../onboarding.types'
import { OnboardingFeatureTiles } from './OnboardingFeatureTiles'

type Props = {
  timeline: Animated.Value
  theme: MD3Theme
  regularText: OnboardingTextStyle
  strongText: OnboardingTextStyle
  finished: boolean
  onStart: () => void
}

const interpolate = (value: Animated.Value, inputRange: number[], outputRange: number[]) =>
  value.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  })

const appear = (value: Animated.Value, start: number, duration = 300) =>
  interpolate(value, [start, start + duration], [0, 1])

export const OnboardingIntroContent = ({
  timeline,
  theme,
  regularText,
  strongText,
  finished,
  onStart,
}: Props) => {
  const { colors } = theme

  return (
    <Animated.View
      pointerEvents={finished ? 'auto' : 'none'}
      accessibilityElementsHidden={!finished}
      importantForAccessibility={finished ? 'auto' : 'no-hide-descendants'}
      style={[
        styles.finalContent,
        {
          opacity: appear(timeline, 6150, 450),
          transform: [
            {
              translateY: interpolate(timeline, [6150, 6600], [16, 0]),
            },
          ],
        },
      ]}
    >
      <Text style={[styles.finalTitle, strongText]}>{COPY.title}</Text>

      <Text style={[styles.finalDescription, regularText]}>{COPY.description}</Text>

      <OnboardingFeatureTiles timeline={timeline} theme={theme} strongText={strongText} />

      <Animated.View
        style={[
          styles.startContainer,
          {
            opacity: appear(timeline, 7000, 350),
            transform: [
              {
                translateY: interpolate(timeline, [7000, 7350], [12, 0]),
              },
            ],
          },
        ]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={COPY.start}
          disabled={!finished}
          onPress={onStart}
          style={({ pressed }) => [
            styles.startButton,
            {
              backgroundColor: colors.primary,
              shadowColor: colors.primary,
              opacity: pressed ? 0.9 : 1,
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
              transform: [
                {
                  scale: pressed ? 0.98 : 1,
                },
              ],
            },
          ]}
        >
          <Text
            style={[
              styles.startText,
              strongText,
              {
                color: colors.onPrimary,
              },
            ]}
          >
            {COPY.start}
          </Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  )
}
