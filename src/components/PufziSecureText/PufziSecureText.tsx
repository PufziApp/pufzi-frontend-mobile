import { View } from 'react-native'
import { Icon, Text, useTheme } from 'react-native-paper'

type Props = {
  text: string
}

export const PufziSecureText = ({ text }: Props) => {
  const theme = useTheme()

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
      }}
    >
      <Icon source="shield-check-outline" size={16} color={theme.colors.onSurfaceVariant} />

      <Text
        variant="bodySmall"
        style={{
          color: theme.colors.onSurfaceVariant,
          marginLeft: 6,
        }}
      >
        {text}
      </Text>
    </View>
  )
}
