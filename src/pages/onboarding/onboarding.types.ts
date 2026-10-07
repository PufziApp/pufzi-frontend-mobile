import type { Animated } from 'react-native'
import type { MD3Theme } from 'react-native-paper'

export type OnboardingTextStyle = {
  color: string
  fontFamily: string
}

export type OnboardingCardAppearance = {
  backgroundColor: string
  borderColor: string
  shadowColor: string
}

export type OnboardingAnimation = {
  timeline: Animated.Value
  groomingLoaded: boolean
  bookingLoaded: boolean
  finished: boolean
  setGroomingLoaded: (loaded: boolean) => void
  setBookingLoaded: (loaded: boolean) => void
}

export type SharedOnboardingProps = {
  timeline: Animated.Value
  theme: MD3Theme
  regularText: OnboardingTextStyle
  strongText: OnboardingTextStyle
}
