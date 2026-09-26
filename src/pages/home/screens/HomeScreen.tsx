import { View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

type Props = {
  onLogout: () => void
}

export const HomeScreen = ({ onLogout }: Props) => {
  const theme = useTheme()
  const { t } = useTranslation('Home')

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text
        variant="headlineMedium"
        style={{
          color: theme.colors.onBackground,
          fontWeight: '800',
          textAlign: 'center',
        }}
      >
        {t('title')}
      </Text>

      <Text
        variant="bodyLarge"
        style={{
          color: theme.colors.onSurfaceVariant,
          textAlign: 'center',
          marginTop: 12,
        }}
      >
        {t('description')}
      </Text>

      <Button
        mode="contained"
        onPress={onLogout}
        buttonColor={theme.colors.primary}
        textColor="#FFFFFF"
        contentStyle={{
          height: 54,
        }}
        style={{
          width: '100%',
          borderRadius: 16,
          marginTop: 32,
        }}
      >
        {t('logout')}
      </Button>
    </View>
  )
}
