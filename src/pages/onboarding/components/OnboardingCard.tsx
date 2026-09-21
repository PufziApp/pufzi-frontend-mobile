import type { ReactNode } from 'react'
import { View } from 'react-native'
import { Icon, Text, useTheme } from 'react-native-paper'

type OnboardingCardProps = {
  icon: string
  title: string
  description: string
  iconSize?: number
  rightContent?: ReactNode
}

export const OnboardingCard = ({
  icon,
  title,
  description,
  iconSize = 24,
  rightContent,
}: OnboardingCardProps) => {
  const theme = useTheme()

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 22,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.outline,
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 17,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.primaryContainer,
        }}
      >
        <Icon source={icon} size={iconSize} color={theme.colors.primary} />
      </View>

      <View
        style={{
          flex: 1,
          marginLeft: 12,
        }}
      >
        <Text
          variant="titleMedium"
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

      {rightContent}
    </View>
  )
}
