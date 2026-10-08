import { View } from 'react-native'
import { Icon, Text, useTheme } from 'react-native-paper'

type Props = {
  title: string
  message: string
  tone?: 'error' | 'warning'
}

export const PufziFormAlert = ({ title, message, tone = 'error' }: Props) => {
  const theme = useTheme()
  const isWarning = tone === 'warning'
  const accent = isWarning ? theme.colors.tertiary : theme.colors.error

  return (
    <View
      accessible
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      accessibilityLabel={`${title}. ${message}`}
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        paddingHorizontal: 14,
        paddingVertical: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: `${accent}${theme.dark ? '80' : '55'}`,
        backgroundColor: `${accent}${theme.dark ? '18' : '0A'}`,
      }}
    >
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `${accent}${theme.dark ? '24' : '12'}`,
        }}
      >
        <Icon
          source={isWarning ? 'clock-outline' : 'information-outline'}
          size={19}
          color={accent}
        />
      </View>

      <View style={{ flex: 1, gap: 4 }}>
        <Text
          style={{
            fontSize: 14,
            lineHeight: 20,
            fontWeight: '600',
            color: theme.colors.onSurface,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            fontSize: 13,
            lineHeight: 20,
            color: theme.colors.onSurfaceVariant,
          }}
        >
          {message}
        </Text>
      </View>
    </View>
  )
}
