import { Text, useTheme } from 'react-native-paper'
import { View } from 'react-native'

type OnboardingIntroContentProps = {
  title: string
  description: string
}

export const OnboardingIntroContent = ({ title, description }: OnboardingIntroContentProps) => {
  const theme = useTheme()

  return (
    <View
      style={{
        alignItems: 'center',
      }}
    >
      <Text
        variant="headlineMedium"
        style={{
          color: theme.colors.onBackground,
          fontWeight: '800',
          textAlign: 'center',
        }}
      >
        {title}
      </Text>

      <Text
        variant="bodyLarge"
        style={{
          color: theme.colors.onSurfaceVariant,
          textAlign: 'center',
          lineHeight: 24,
          marginTop: 10,
          maxWidth: 340,
        }}
      >
        {description}
      </Text>
    </View>
  )
}
