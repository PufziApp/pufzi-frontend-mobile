import { useEffect, useRef } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Image, View } from 'react-native'
import { ActivityIndicator, Button, Icon, Text, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import type { RootStackParamList } from '../../../navigation/navigationTypes'

import { useConfirmEmail } from '../hooks/useConfirmEmail'

type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmEmail'>

export const ConfirmEmailScreen = ({ route, navigation }: Props) => {
  const theme = useTheme()
  const { t } = useTranslation('ConfirmEmail')
  const confirmEmailMutation = useConfirmEmail()

  const hasStarted = useRef(false)

  useEffect(() => {
    if (hasStarted.current) {
      return
    }

    hasStarted.current = true

    confirmEmailMutation.mutate({
      token: route.params.token,
    })
  }, [confirmEmailMutation, route.params.token])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../../../assets/LogoPufziColor.png')}
          resizeMode="contain"
          style={{
            width: 120,
            height: 120,
            marginBottom: 32,
          }}
        />

        {confirmEmailMutation.isPending && (
          <>
            <ActivityIndicator size="large" color={theme.colors.primary} />

            <Text
              variant="headlineSmall"
              style={{
                color: theme.colors.onBackground,
                fontWeight: '800',
                textAlign: 'center',
                marginTop: 24,
              }}
            >
              {t('confirmingTitle')}
            </Text>

            <Text
              variant="bodyLarge"
              style={{
                color: theme.colors.onSurfaceVariant,
                textAlign: 'center',
                marginTop: 10,
              }}
            >
              {t('confirmingDescription')}
            </Text>
          </>
        )}

        {confirmEmailMutation.isSuccess && (
          <>
            <Icon source="check-circle" size={64} color={theme.colors.primary} />

            <Text
              variant="headlineSmall"
              style={{
                color: theme.colors.onBackground,
                fontWeight: '800',
                textAlign: 'center',
                marginTop: 16,
              }}
            >
              {t('successTitle')}
            </Text>

            <Text
              variant="bodyLarge"
              style={{
                color: theme.colors.onSurfaceVariant,
                textAlign: 'center',
                marginTop: 10,
              }}
            >
              {t('successDescription')}
            </Text>

            <Button
              mode="contained"
              onPress={() => {
                navigation.replace('Login')
              }}
              buttonColor={theme.colors.primary}
              textColor="#FFFFFF"
              contentStyle={{
                height: 56,
              }}
              style={{
                width: '100%',
                borderRadius: 16,
                marginTop: 32,
              }}
            >
              {t('login')}
            </Button>
          </>
        )}

        {confirmEmailMutation.isError && (
          <>
            <Text
              variant="displaySmall"
              style={{
                color: theme.colors.error,
                fontWeight: '800',
              }}
            >
              !
            </Text>

            <Text
              variant="headlineSmall"
              style={{
                color: theme.colors.onBackground,
                fontWeight: '800',
                textAlign: 'center',
                marginTop: 16,
              }}
            >
              {t('errorTitle')}
            </Text>

            <Text
              variant="bodyLarge"
              style={{
                color: theme.colors.onSurfaceVariant,
                textAlign: 'center',
                marginTop: 10,
              }}
            >
              {t('errorDescription')}
            </Text>

            <Button
              mode="outlined"
              onPress={() => {
                navigation.replace('Login')
              }}
              textColor={theme.colors.primary}
              style={{
                width: '100%',
                borderRadius: 16,
                marginTop: 32,
              }}
              contentStyle={{
                height: 56,
              }}
            >
              {t('backToLogin')}
            </Button>
          </>
        )}
      </View>
    </View>
  )
}
