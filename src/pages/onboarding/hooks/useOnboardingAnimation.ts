import { useEffect, useRef, useState } from 'react'
import { Animated, Easing } from 'react-native'

import { DURATION } from '../onboarding.constants'

export const useOnboardingAnimation = () => {
  const timeline = useRef(new Animated.Value(0)).current

  const [groomingLoaded, setGroomingLoaded] = useState(false)
  const [bookingLoaded, setBookingLoaded] = useState(false)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (!groomingLoaded) {
      return
    }

    timeline.setValue(0)
    setFinished(false)

    const animation = Animated.timing(timeline, {
      toValue: DURATION,
      duration: DURATION * 1.4,
      easing: Easing.linear,
      useNativeDriver: true,
    })

    animation.start(({ finished: completed }) => {
      if (completed) {
        setFinished(true)
      }
    })

    return () => {
      animation.stop()
    }
  }, [bookingLoaded, groomingLoaded, timeline])

  return {
    timeline,
    groomingLoaded,
    bookingLoaded,
    finished,
    setGroomingLoaded,
    setBookingLoaded,
  }
}
