import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { Icon, useTheme } from 'react-native-paper'

export const PufziAuthBackground = () => {
  const theme = useTheme()

  const pawFloat1 = useRef(new Animated.Value(0)).current
  const pawFloat2 = useRef(new Animated.Value(0)).current
  const pawFloat3 = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const animation1 = Animated.loop(
      Animated.sequence([
        Animated.timing(pawFloat1, {
          toValue: 1,
          duration: 3200,
          useNativeDriver: true,
        }),
        Animated.timing(pawFloat1, {
          toValue: 0,
          duration: 3200,
          useNativeDriver: true,
        }),
      ]),
    )

    const animation2 = Animated.loop(
      Animated.sequence([
        Animated.timing(pawFloat2, {
          toValue: 1,
          duration: 3900,
          useNativeDriver: true,
        }),
        Animated.timing(pawFloat2, {
          toValue: 0,
          duration: 3900,
          useNativeDriver: true,
        }),
      ]),
    )

    const animation3 = Animated.loop(
      Animated.sequence([
        Animated.timing(pawFloat3, {
          toValue: 1,
          duration: 4400,
          useNativeDriver: true,
        }),
        Animated.timing(pawFloat3, {
          toValue: 0,
          duration: 4400,
          useNativeDriver: true,
        }),
      ]),
    )

    animation1.start()
    animation2.start()
    animation3.start()

    return () => {
      animation1.stop()
      animation2.stop()
      animation3.stop()
    }
  }, [pawFloat1, pawFloat2, pawFloat3])

  const paw1TranslateY = pawFloat1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -14],
  })

  const paw1Rotate = pawFloat1.interpolate({
    inputRange: [0, 1],
    outputRange: ['-18deg', '-8deg'],
  })

  const paw2TranslateY = pawFloat2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  })

  const paw2Rotate = pawFloat2.interpolate({
    inputRange: [0, 1],
    outputRange: ['18deg', '8deg'],
  })

  const paw3TranslateY = pawFloat3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  })

  const paw3Rotate = pawFloat3.interpolate({
    inputRange: [0, 1],
    outputRange: ['-10deg', '4deg'],
  })

  return (
    <>
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 115,
          left: -8,
          opacity: 0.1,
          transform: [{ translateY: paw1TranslateY }, { rotate: paw1Rotate }],
        }}
      >
        <Icon source="paw" size={70} color={theme.colors.primary} />
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 320,
          right: -10,
          opacity: 0.08,
          transform: [{ translateY: paw2TranslateY }, { rotate: paw2Rotate }],
        }}
      >
        <Icon source="paw" size={58} color={theme.colors.primary} />
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: 75,
          left: 14,
          opacity: 0.07,
          transform: [{ translateY: paw3TranslateY }, { rotate: paw3Rotate }],
        }}
      >
        <Icon source="paw" size={48} color={theme.colors.primary} />
      </Animated.View>
    </>
  )
}
