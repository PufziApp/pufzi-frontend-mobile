import { Pressable, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

type Props = {
  text: string
  actionText: string
  onPress: () => void
}

export const PufziFormFooter = ({ text, actionText, onPress }: Props) => {
  const theme = useTheme()

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 5,
        marginTop: 4,
      }}
    >
      <Text style={{ fontSize: 14, color: theme.colors.onSurfaceVariant }}>{text}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={{ minHeight: 44, justifyContent: 'center', paddingVertical: 10 }}
      >
        <Text
          style={{
            fontSize: 14,
            color: theme.colors.onSurface,
            fontWeight: '700',
            textDecorationLine: 'underline',
          }}
        >
          {actionText}
        </Text>
      </Pressable>
    </View>
  )
}
