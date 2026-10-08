import { View } from 'react-native'
import { Icon, Text, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import { getPasswordChecks } from '../schemas/registerSchema'

type Props = {
  password: string
}

const requirementKeys = ['minLength', 'uppercase', 'number', 'special'] as const

const strengthKeys = ['empty', 'weak', 'fair', 'good', 'strong'] as const

export const PasswordRequirements = ({ password }: Props) => {
  const theme = useTheme()
  const { t } = useTranslation('Register')

  const checks = getPasswordChecks(password)
  const passedCount = Object.values(checks).filter(Boolean).length
  const allPassed = passedCount === requirementKeys.length

  const strength = !password
    ? 0
    : allPassed
    ? password.length >= 12
      ? 4
      : 3
    : passedCount >= 2
    ? 2
    : 1

  const strengthColor =
    strength >= 3
      ? theme.colors.secondary
      : strength === 2
      ? theme.colors.tertiary
      : theme.colors.error

  return (
    <View
      style={{
        gap: 14,
        padding: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.colors.outlineVariant,
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        accessible
        accessibilityLabel={t('passwordStrength.accessibility', {
          strength: t(`passwordStrength.${strengthKeys[strength]}`),
        })}
        style={{ gap: 8 }}
      >
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 6,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: '600',
              color: theme.colors.onSurface,
            }}
          >
            {t('passwordStrength.title')}
          </Text>

          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: theme.colors.onSurfaceVariant,
            }}
          >
            {t(`passwordStrength.${strengthKeys[strength]}`)}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 5 }}>
          {[1, 2, 3, 4].map(segment => (
            <View
              key={segment}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                backgroundColor: segment <= strength ? strengthColor : theme.colors.outlineVariant,
              }}
            />
          ))}
        </View>
      </View>

      <View style={{ gap: 9 }}>
        {requirementKeys.map(key => {
          const passed = checks[key]
          const label = t(`passwordRequirements.${key}`)

          return (
            <View
              key={key}
              accessible
              accessibilityLabel={t(
                passed ? 'passwordRequirements.met' : 'passwordRequirements.notMet',
                { requirement: label },
              )}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Icon
                source={passed ? 'check-circle' : 'checkbox-blank-circle-outline'}
                size={18}
                color={passed ? theme.colors.secondary : theme.colors.onSurfaceVariant}
              />

              <Text
                style={{
                  flex: 1,
                  fontSize: 13,
                  lineHeight: 19,
                  color: passed ? theme.colors.onSurface : theme.colors.onSurfaceVariant,
                }}
              >
                {label}
              </Text>
            </View>
          )
        })}
      </View>

      {allPassed && strength < 4 && (
        <Text
          style={{
            fontSize: 12,
            lineHeight: 18,
            color: theme.colors.onSurfaceVariant,
          }}
        >
          {t('passwordStrength.hint')}
        </Text>
      )}
    </View>
  )
}
