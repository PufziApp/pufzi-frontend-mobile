import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

type Props = {
  title: string
  description: string
  align?: 'left' | 'center'
}

export const PufziAuthHeader = ({ title, description, align = 'center' }: Props) => {
  const theme = useTheme()

  return (
    <View style={{ marginBottom: align === 'left' ? 18 : 28 }}>
      <Text
        accessibilityRole="header"
        style={{
          color: theme.colors.onSurface,
          fontSize: 26,
          lineHeight: 33,
          fontWeight: '700',
          letterSpacing: -0.6,
          textAlign: align,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          color: theme.colors.onSurfaceVariant,
          fontSize: 15,
          lineHeight: 22,
          marginTop: 7,
          textAlign: align,
        }}
      >
        {description}
      </Text>
    </View>
  )
}
