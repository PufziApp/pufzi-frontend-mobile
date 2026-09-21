import { useState } from 'react'
import { Button, Menu } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

type Language = 'ro' | 'en' | 'hu'

const languages = {
  ro: {
    flag: '🇷🇴',
    label: 'RO',
  },
  en: {
    flag: '🇬🇧',
    label: 'EN',
  },
  hu: {
    flag: '🇭🇺',
    label: 'HU',
  },
} as const

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [visible, setVisible] = useState(false)

  const currentLanguage = (i18n.resolvedLanguage ?? 'ro') as Language

  const handleLanguageChange = async (language: Language) => {
    await i18n.changeLanguage(language)
    setVisible(false)
  }

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <Button compact mode="text" onPress={() => setVisible(true)}>
          {`${languages[currentLanguage].flag} ${languages[currentLanguage].label}`}
        </Button>
      }
    >
      <Menu.Item title="🇷🇴 RO" onPress={() => handleLanguageChange('ro')} />

      <Menu.Item title="🇬🇧 EN" onPress={() => handleLanguageChange('en')} />

      <Menu.Item title="🇭🇺 HU" onPress={() => handleLanguageChange('hu')} />
    </Menu>
  )
}
