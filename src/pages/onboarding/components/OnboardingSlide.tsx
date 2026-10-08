import { Animated, Image, Text, View } from 'react-native'
import { Icon, type MD3Theme } from 'react-native-paper'

import {
  ASSETS,
  CONFIRMATION_BACKGROUND,
  COPY,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
} from '../onboarding.constants'
import { styles } from '../onboarding.styles'
import type { OnboardingCardAppearance, OnboardingTextStyle } from '../onboarding.types'
import { OnboardingBookingCard } from './OnboardingBookingCard'
import { OnboardingCard } from './OnboardingCard'
import { OnboardingConfirmationCard } from './OnboardingConfirmationCard'
import { OnboardingIntroContent } from './OnboardingIntroContent'
import { OnboardingStoryProgress } from './OnboardingStoryProgress'

type Props = {
  timeline: Animated.Value
  theme: MD3Theme
  scale: number
  finished: boolean
  regularText: OnboardingTextStyle
  strongText: OnboardingTextStyle
  cardAppearance: OnboardingCardAppearance
  onStart: () => void
  onGroomingLoaded: () => void
  onBookingLoaded: () => void
}

const interpolate = (value: Animated.Value, inputRange: number[], outputRange: number[]) =>
  value.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  })

const appear = (value: Animated.Value, start: number, duration = 300) =>
  interpolate(value, [start, start + duration], [0, 1])

const sceneOpacity = (value: Animated.Value, start: number, end: number) =>
  start === 0
    ? interpolate(value, [0, end, end + 300], [1, 1, 0])
    : interpolate(value, [start, start + 300, end, end + 300], [0, 1, 1, 0])

const BRAND_NAME = 'Pufzi'

export const OnboardingSlide = ({
  timeline,
  theme,
  scale,
  finished,
  regularText,
  strongText,
  cardAppearance,
  onStart,
  onGroomingLoaded,
}: Props) => {
  const { colors } = theme

  return (
    <View
      style={{
        width: '100%',
        height: DESIGN_HEIGHT * scale,
        overflow: 'hidden',
      }}
    >
      <View
        style={[
          styles.canvas,
          {
            backgroundColor: colors.surface,
            left: (DESIGN_WIDTH * scale - DESIGN_WIDTH) / 2,
            top: 0,
            transform: [{ scale }],
          },
        ]}
      >
        <Image
          source={ASSETS.hero}
          resizeMode="cover"
          onLoad={onGroomingLoaded}
          style={styles.hero}
        />

        <View pointerEvents="none" style={styles.logoPosition}>
          <View
            style={[
              styles.logoBadge,
              {
                backgroundColor: colors.surface,
              },
            ]}
          >
            <Image source={ASSETS.logo} resizeMode="contain" style={styles.logo} />

            <Text
              style={[
                styles.logoName,
                {
                  color: colors.onSurface,
                  fontFamily: theme.fonts.titleLarge.fontFamily,
                },
              ]}
            >
              {BRAND_NAME}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.bottomPanel,
            {
              backgroundColor: colors.surface,
            },
          ]}
        />

        <OnboardingCard
          timeline={timeline}
          theme={theme}
          cardAppearance={cardAppearance}
          regularText={regularText}
          strongText={strongText}
          opacity={sceneOpacity(timeline, 0, 1800)}
        />

        <OnboardingBookingCard
          timeline={timeline}
          theme={theme}
          cardAppearance={cardAppearance}
          regularText={regularText}
          strongText={strongText}
          opacity={sceneOpacity(timeline, 2150, 4400)}
        />

        <OnboardingConfirmationCard
          timeline={timeline}
          theme={theme}
          cardAppearance={cardAppearance}
          regularText={regularText}
          strongText={strongText}
          opacity={sceneOpacity(timeline, 4550, 6100)}
        />

        <OnboardingStoryProgress timeline={timeline} theme={theme} strongText={strongText} />

        <Animated.View
          pointerEvents="none"
          accessibilityElementsHidden={!finished}
          importantForAccessibility={finished ? 'auto' : 'no-hide-descendants'}
          style={[
            styles.confirmationPill,
            {
              backgroundColor: CONFIRMATION_BACKGROUND[theme.dark ? 'dark' : 'light'],
              borderColor: colors.secondary,
              shadowColor: colors.secondary,
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
              opacity: appear(timeline, 6200, 300),
              transform: [
                {
                  translateY: interpolate(timeline, [6200, 6500], [48, 0]),
                },
              ],
            },
          ]}
        >
          <View
            style={[
              styles.pillIcon,
              {
                backgroundColor: colors.secondary,
              },
            ]}
          >
            <Icon source="check" size={23} color={colors.onSecondary} />
          </View>

          <View>
            <Animated.Text style={[styles.pillTitle, strongText]}>{COPY.confirmed}</Animated.Text>

            <Animated.Text style={[styles.pillSubtitle, regularText]}>
              {COPY.appointment}
            </Animated.Text>
          </View>
        </Animated.View>

        <OnboardingIntroContent
          timeline={timeline}
          theme={theme}
          regularText={regularText}
          strongText={strongText}
          finished={finished}
          onStart={onStart}
        />
      </View>
    </View>
  )
}
