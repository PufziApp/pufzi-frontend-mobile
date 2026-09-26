import { Button, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

type Props = {
  onPress: () => void
  loading?: boolean
  disabled?: boolean
}

export const GoogleAuthButton = ({ onPress, loading, disabled }: Props) => {
  const theme = useTheme()
  const { t } = useTranslation('Common')

  return (
    <Button
      mode="outlined"
      icon="google"
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      textColor={theme.colors.onSurface}
      contentStyle={{
        height: 56,
      }}
      style={{
        borderRadius: 16,
        borderColor: theme.colors.outline,
      }}
      labelStyle={{
        fontSize: 15,
        fontWeight: '700',
      }}
    >
      {t('continueWithGoogle')}
    </Button>
  )
}
