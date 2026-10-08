import { Animated, Image, Text, View } from 'react-native'
import type { MD3Theme } from 'react-native-paper'

import { FEATURES } from '../onboarding.constants'
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

export const OnboardingFeatureTiles = ({ timeline, theme, strongText }: Props) => {
  const { colors } = theme

  return (
    <View style={styles.features}>
      {FEATURES.map((feature, index) => (
        <Animated.View
          key={feature.label}
          style={[
            styles.feature,
            {
              backgroundColor: colors.background,
              borderColor: colors.outlineVariant,
              opacity: appear(timeline, 6500 + index * 140, 320),
              transform: [
                {
                  translateY: interpolate(
                    timeline,
                    [6500 + index * 140, 6820 + index * 140],
                    [14, 0],
                  ),
                },
              ],
            },
          ]}
        >
          <Image source={feature.image} resizeMode="cover" style={styles.featureImage} />

          <Text style={[styles.featureLabel, strongText]}>{feature.label}</Text>
        </Animated.View>
      ))}
    </View>
  )
}
