import { Image } from 'react-native'
import { Button, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

type Props = {
  onPress: () => void
  loading?: boolean
  disabled?: boolean
}

const GoogleIcon = ({ size }: { size: number }) => (
  <Image
    source={require('../../assets/auth/google.png')}
    resizeMode="contain"
    style={{ width: size, height: size }}
  />
)

export const GoogleAuthButton = ({ onPress, loading, disabled }: Props) => {
  const theme = useTheme()
  const { t } = useTranslation('Common')

  return (
    <Button
      mode="outlined"
      icon={GoogleIcon}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      textColor={theme.colors.onSurface}
      contentStyle={{ minHeight: 54 }}
      style={{
        borderRadius: 18,
        borderColor: theme.colors.outline,
        backgroundColor: theme.colors.background,
      }}
      labelStyle={{ fontSize: 14, fontWeight: '800', marginVertical: 15 }}
    >
      {t('continueWithGoogle')}
    </Button>
  )
}
