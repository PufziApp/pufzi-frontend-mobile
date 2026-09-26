import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Image, View } from 'react-native'
import { Button, Icon, Text, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import { AppControls } from '../../../components/AppControls/AppControls'
import type { RootStackParamList } from '../../../navigation/navigationTypes'

type Props = NativeStackScreenProps<RootStackParamList, 'CheckEmail'>

export const CheckEmailScreen = ({ route, navigation }: Props) => {
  const theme = useTheme()
  const { t } = useTranslation('Register')

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 24,
        paddingTop: 48,
        paddingBottom: 32,
      }}
    >
      <View style={{ alignItems: 'flex-end' }}>
        <AppControls />
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../../../assets/LogoPufziColor.png')}
          resizeMode="contain"
          style={{ width: 120, height: 120, marginBottom: 24 }}
        />
        <Icon source="email-check-outline" size={64} color={theme.colors.primary} />

        <Text
          variant="headlineMedium"
          style={{
            color: theme.colors.onBackground,
            fontWeight: '800',
            textAlign: 'center',
            marginTop: 24,
          }}
        >
          {t('checkEmailTitle')}
        </Text>

        <Text
          variant="bodyLarge"
          style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center', marginTop: 12 }}
        >
          {t('checkEmailDescription')}
        </Text>

        <Text
          variant="bodyLarge"
          style={{
            color: theme.colors.primary,
            fontWeight: '700',
            textAlign: 'center',
            marginTop: 8,
          }}
        >
          {route.params.email}
        </Text>

        <Button
          mode="outlined"
          onPress={() => {
            navigation.replace('Login')
          }}
          textColor={theme.colors.primary}
          contentStyle={{ height: 56 }}
          style={{ width: '100%', borderRadius: 16, marginTop: 32 }}
        >
          {t('backToLogin')}
        </Button>
      </View>
    </View>
  )
}
