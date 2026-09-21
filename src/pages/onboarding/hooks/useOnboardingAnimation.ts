import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

export const useOnboardingAnimation = () => {
  const logoOpacity = useRef(new Animated.Value(0)).current
  const logoScale = useRef(new Animated.Value(0.65)).current
  const logoY = useRef(new Animated.Value(55)).current

  const petOpacity = useRef(new Animated.Value(0)).current
  const petX = useRef(new Animated.Value(-45)).current

  const salonOpacity = useRef(new Animated.Value(0)).current
  const salonX = useRef(new Animated.Value(45)).current

  const bookingOpacity = useRef(new Animated.Value(0)).current
  const bookingY = useRef(new Animated.Value(35)).current
  const bookingScale = useRef(new Animated.Value(0.94)).current

  const checkScale = useRef(new Animated.Value(0)).current

  const contentOpacity = useRef(new Animated.Value(0)).current
  const contentY = useRef(new Animated.Value(18)).current

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.delay(150),

      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(logoY, {
          toValue: 0,
          tension: 45,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(150),

      Animated.parallel([
        Animated.timing(petOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(petX, {
          toValue: 0,
          tension: 45,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(80),

      Animated.parallel([
        Animated.timing(salonOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(salonX, {
          toValue: 0,
          tension: 45,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(100),

      Animated.parallel([
        Animated.timing(bookingOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(bookingY, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(bookingScale, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),

      Animated.spring(checkScale, {
        toValue: 1,
        tension: 80,
        friction: 5,
        useNativeDriver: true,
      }),

      Animated.delay(150),

      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.spring(contentY, {
          toValue: 0,
          tension: 45,
          friction: 9,
          useNativeDriver: true,
        }),
      ]),
    ])

    animation.start()

    return () => animation.stop()
  }, [
    bookingOpacity,
    bookingScale,
    bookingY,
    checkScale,
    contentOpacity,
    contentY,
    logoOpacity,
    logoScale,
    logoY,
    petOpacity,
    petX,
    salonOpacity,
    salonX,
  ])

  return {
    logo: {
      opacity: logoOpacity,
      scale: logoScale,
      translateY: logoY,
    },
    pet: {
      opacity: petOpacity,
      translateX: petX,
    },
    salon: {
      opacity: salonOpacity,
      translateX: salonX,
    },
    booking: {
      opacity: bookingOpacity,
      translateY: bookingY,
      scale: bookingScale,
      checkScale,
    },
    content: {
      opacity: contentOpacity,
      translateY: contentY,
    },
  }
}
