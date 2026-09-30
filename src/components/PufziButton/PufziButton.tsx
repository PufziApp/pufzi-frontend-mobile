import { useRef } from 'react'
import { Animated, Pressable } from 'react-native'
import { Button, useTheme } from 'react-native-paper'

type Props = {
  label: string
  onPress: () => void
  loading?: boolean
  disabled?: boolean
}

export const PufziButton = ({ label, onPress, loading = false, disabled = false }: Props) => {
  const theme = useTheme()
  const buttonScale = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 40,
      bounciness: 8,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 10,
    }).start()
  }

  return (
    <Animated.View
      style={{
        transform: [{ scale: buttonScale }],
      }}
    >
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
        <Button
          mode="contained"
          onPress={onPress}
          loading={loading}
          disabled={disabled}
          buttonColor={theme.colors.primary}
          textColor={theme.colors.surface}
          contentStyle={{
            height: 56,
          }}
          style={{
            borderRadius: 18,
            shadowColor: theme.colors.primary,
            shadowOpacity: 0.35,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 6,
          }}
          labelStyle={{
            fontSize: 15,
            fontWeight: '800',
          }}
        >
          {label}
        </Button>
      </Pressable>
    </Animated.View>
  )
}
