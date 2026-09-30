import { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'
import { Icon, Text, useTheme } from 'react-native-paper'

type Props = {
  title: string
  description: string
}

export const PufziAuthHeader = ({ title, description }: Props) => {
  const theme = useTheme()
  const pawWiggle = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pawWiggle, {
          toValue: 1,
          duration: 550,
          useNativeDriver: true,
        }),
        Animated.timing(pawWiggle, {
          toValue: -1,
          duration: 550,
          useNativeDriver: true,
        }),
        Animated.timing(pawWiggle, {
          toValue: 0,
          duration: 550,
          useNativeDriver: true,
        }),
        Animated.delay(1400),
      ]),
    )

    animation.start()

    return () => animation.stop()
  }, [pawWiggle])

  const pawRotate = pawWiggle.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-22deg', '-8deg', '6deg'],
  })

  return (
    <View
      style={{
        alignItems: 'center',
        marginBottom: 28,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Text
          variant="headlineMedium"
          style={{
            color: theme.colors.onBackground,
            fontWeight: '900',
            letterSpacing: -0.6,
            textAlign: 'center',
          }}
        >
          {title}
        </Text>

        <Animated.View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
            transform: [{ rotate: pawRotate }],
          }}
        >
          <Icon source="paw" size={21} color={theme.colors.primary} />

          <View
            style={{
              marginLeft: -2,
              marginTop: -14,
              transform: [{ rotate: '18deg' }],
            }}
          >
            <Icon source="paw" size={14} color={theme.colors.primary} />
          </View>
        </Animated.View>
      </View>

      <Text
        variant="bodyLarge"
        style={{
          color: theme.colors.onSurfaceVariant,
          lineHeight: 24,
          marginTop: 8,
          maxWidth: 360,
          textAlign: 'center',
        }}
      >
        {description}
      </Text>
    </View>
  )
}
