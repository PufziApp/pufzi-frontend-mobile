import { Button, useTheme } from 'react-native-paper'

import { sageColors } from '../../theme/colors'

type Props = {
  label: string
  onPress: () => void
  loading?: boolean
  disabled?: boolean
}

export const PufziButton = ({ label, onPress, loading = false, disabled = false }: Props) => {
  const theme = useTheme()

  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={loading}
      disabled={disabled || loading}
      accessibilityLabel={label}
      accessibilityState={{
        busy: loading,
        disabled: disabled || loading,
      }}
      buttonColor={theme.colors.primary}
      textColor={sageColors.light.white}
      contentStyle={{ minHeight: 56 }}
      style={{ borderRadius: 18 }}
      labelStyle={{ fontSize: 17, fontWeight: '700', marginVertical: 16 }}
    >
      {label}
    </Button>
  )
}
