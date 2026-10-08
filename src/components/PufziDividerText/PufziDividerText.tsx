import { View } from 'react-native'
import { Divider, Text, useTheme } from 'react-native-paper'

type Props = { text: string }

export const PufziDividerText = ({ text }: Props) => {
  const theme = useTheme()

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginVertical: 7 }}>
      <Divider style={{ flex: 1, backgroundColor: theme.colors.outline }} />
      <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12 }}>{text}</Text>
      <Divider style={{ flex: 1, backgroundColor: theme.colors.outline }} />
    </View>
  )
}
