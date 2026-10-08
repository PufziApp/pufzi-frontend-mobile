import { Pressable, View } from 'react-native'
import { Icon, Text, useTheme } from 'react-native-paper'

type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  hint: string
  disabled?: boolean
}

export const PufziTermsConsent = ({ checked, onChange, label, hint, disabled = false }: Props) => {
  const theme = useTheme()

  return (
    <View style={{ gap: 4 }}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityLabel={label}
        accessibilityState={{ checked, disabled }}
        disabled={disabled}
        onPress={() => onChange(!checked)}
        style={({ pressed }) => ({
          minHeight: 48,
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 11,
          paddingVertical: 10,
          opacity: disabled ? 0.55 : pressed ? 0.75 : 1,
        })}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 7,
            borderWidth: checked ? 0 : 1.5,
            borderColor: theme.colors.outline,
            backgroundColor: checked ? theme.colors.primaryContainer : theme.colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {checked && <Icon source="check" size={18} color={theme.colors.onSurface} />}
        </View>

        <Text
          style={{
            flex: 1,
            fontSize: 13,
            lineHeight: 21,
            color: theme.colors.onSurface,
          }}
        >
          {label}
        </Text>
      </Pressable>

      {!checked && (
        <Text
          style={{
            marginLeft: 35,
            fontSize: 12,
            lineHeight: 18,
            color: theme.colors.onSurfaceVariant,
          }}
        >
          {hint}
        </Text>
      )}
    </View>
  )
}
