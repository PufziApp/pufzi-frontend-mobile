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
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginTop: 4,
      }}
    >
      <Text
        variant="bodyMedium"
        style={{
          color: theme.colors.onSurfaceVariant,
        }}
      >
        {text}
      </Text>

      <Pressable
        onPress={onPress}
        style={{
          paddingVertical: 6,
        }}
      >
        <Text
          variant="bodyMedium"
          style={{
            color: theme.colors.primary,
            fontWeight: '800',
          }}
        >
          {actionText}
        </Text>
      </Pressable>
    </View>
  )
}
