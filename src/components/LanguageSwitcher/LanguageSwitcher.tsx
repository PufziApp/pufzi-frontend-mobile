import { useState } from 'react'
import { Pressable, View } from 'react-native'
import { Button, Menu, Text, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

type Language = 'ro' | 'en' | 'hu'

type Props = {
  compact?: boolean
}

const languages = [
  { code: 'ro', label: 'RO', name: 'Română', flag: '🇷🇴' },
  { code: 'en', label: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'hu', label: 'HU', name: 'Magyar', flag: '🇭🇺' },
] as const

export const LanguageSwitcher = ({ compact = false }: Props) => {
  const { i18n } = useTranslation()
  const theme = useTheme()
  const [visible, setVisible] = useState(false)
  const languageCode = (i18n.resolvedLanguage ?? 'ro').split('-')[0]
  const currentLanguage = languages.find(language => language.code === languageCode) ?? languages[0]

  const handleLanguageChange = async (language: Language) => {
    await i18n.changeLanguage(language)
    setVisible(false)
  }

  if (compact) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.surface,
          borderRadius: 24,
          paddingHorizontal: 3,
        }}
      >
        {languages.map(language => {
          const selected = language.code === currentLanguage.code

          return (
            <Pressable
              key={language.code}
              accessibilityRole="button"
              accessibilityLabel={language.name}
              accessibilityState={{ selected }}
              onPress={() => handleLanguageChange(language.code)}
              style={{
                minWidth: 44,
                minHeight: 44,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  minWidth: 32,
                  height: 32,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: selected ? theme.colors.primary : theme.colors.surface,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '800',
                    color: selected ? theme.colors.onPrimary : theme.colors.onSurface,
                  }}
                >
                  {language.label}
                </Text>
              </View>
            </Pressable>
          )
        })}
      </View>
    )
  }

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <Button compact mode="text" onPress={() => setVisible(true)}>
          {`${currentLanguage.flag} ${currentLanguage.label}`}
        </Button>
      }
    >
      {languages.map(language => (
        <Menu.Item
          key={language.code}
          title={`${language.flag} ${language.label}`}
          onPress={() => handleLanguageChange(language.code)}
        />
      ))}
    </Menu>
  )
}
