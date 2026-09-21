import { Animated, View } from 'react-native'
import { Icon, Text, useTheme } from 'react-native-paper'

type OnboardingBookingCardProps = {
  title: string
  description: string
  checkScale: Animated.Value
}

export const OnboardingBookingCard = ({
  title,
  description,
  checkScale,
}: OnboardingBookingCardProps) => {
  const theme = useTheme()

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 22,
        backgroundColor: theme.colors.primaryContainer,
        borderWidth: 1,
        borderColor: theme.colors.primary,
      }}
    >
      <Animated.View
        style={{
          transform: [{ scale: checkScale }],
        }}
      >
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.surface,
          }}
        >
          <Icon source="check" size={21} color={theme.colors.primary} />
        </View>
      </Animated.View>

      <View
        style={{
          flex: 1,
          marginLeft: 12,
        }}
      >
        <Text
          variant="titleSmall"
          style={{
            color: theme.colors.onSurface,
            fontWeight: '800',
          }}
        >
          {title}
        </Text>

        <Text
          variant="bodySmall"
          style={{
            color: theme.colors.onSurfaceVariant,
            marginTop: 2,
          }}
        >
          {description}
        </Text>
      </View>

      <Icon source="calendar-check-outline" size={24} color={theme.colors.primary} />
    </View>
  )
}
