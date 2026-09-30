import { useEffect, useRef } from 'react'
import { Animated, Image, View } from 'react-native'
import { Icon, Text, useTheme } from 'react-native-paper'

type Props = {
  brandName: string
  badgeText: string
}

export const PufziAuthBrand = ({ brandName, badgeText }: Props) => {
  const theme = useTheme()
  const badgePulse = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(badgePulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(badgePulse, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    )

    animation.start()

    return () => animation.stop()
  }, [badgePulse])

  const badgeOpacity = badgePulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 1],
  })

  const badgeScale = badgePulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1.15],
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
        }}
      >
        <Image
          source={require('../../assets/LogoPufziColor.png')}
          resizeMode="contain"
          style={{
            width: 82,
            height: 82,
          }}
        />

        <Text
          style={{
            color: theme.colors.onBackground,
            fontSize: 40,
            lineHeight: 46,
            fontWeight: '900',
            letterSpacing: -1.5,
            marginLeft: -3,
          }}
        >
          {brandName}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.primaryContainer,
          borderRadius: 20,
          paddingHorizontal: 14,
          paddingVertical: 7,
          marginTop: 6,
        }}
      >
        <Animated.View
          style={{
            opacity: badgeOpacity,
            transform: [{ scale: badgeScale }],
          }}
        >
          <Icon source="content-cut" size={16} color={theme.colors.primary} />
        </Animated.View>

        <Text
          variant="bodyMedium"
          style={{
            color: theme.colors.primary,
            fontWeight: '700',
            marginLeft: 7,
          }}
        >
          {badgeText}
        </Text>

        <Animated.View
          style={{
            marginLeft: 7,
            opacity: badgeOpacity,
            transform: [{ scale: badgeScale }],
          }}
        >
          <Icon source="paw" size={14} color={theme.colors.primary} />
        </Animated.View>
      </View>
    </View>
  )
}
