import { useState, type ReactNode } from 'react'
import { Pressable, View, useWindowDimensions } from 'react-native'
import { Divider, Icon, Menu, Text, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import { orangeColors, sageColors } from '../../theme/colors'
import { useAppTheme } from '../../theme/useAppTheme'

type Props = {
  compact?: boolean
}

type OpenMenu = 'language' | 'appearance' | null

type PreferenceRowProps = {
  label: string
  selected: boolean
  leading: ReactNode
  onPress: () => void
}

const languages = [
  { code: 'ro', label: 'RO', name: 'Română', flag: '🇷🇴' },
  { code: 'en', label: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'hu', label: 'HU', name: 'Magyar', flag: '🇭🇺' },
] as const

const PreferenceRow = ({ label, selected, leading, onPress }: PreferenceRowProps) => {
  const theme = useTheme()

  return (
    <Pressable
      accessibilityRole="menuitem"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 52,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 14,
        backgroundColor: selected || pressed ? theme.colors.primaryContainer : theme.colors.surface,
      })}
    >
      <View
        style={{
          width: 28,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {leading}
      </View>

      <Text
        style={{
          flex: 1,
          fontSize: 16,
          fontWeight: selected ? '600' : '400',
          color: theme.colors.onSurface,
        }}
      >
        {label}
      </Text>

      <View style={{ width: 20 }}>
        {selected && <Icon source="check" size={20} color={theme.colors.onSurface} />}
      </View>
    </Pressable>
  )
}

export const AppControls = ({ compact = false }: Props) => {
  const theme = useTheme()
  const { t, i18n } = useTranslation('Common')
  const { themeColor, mode, setThemeColor, setMode } = useAppTheme()
  const { width } = useWindowDimensions()
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null)

  const languageCode = (i18n.resolvedLanguage ?? i18n.language ?? 'ro').split('-')[0]
  const currentLanguage = languages.find(language => language.code === languageCode) ?? languages[0]

  const menuWidth = Math.min(280, width - 32)

  const menuStyle = {
    width: menuWidth,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
    backgroundColor: theme.colors.surface,
  }

  const closeMenu = () => setOpenMenu(null)

  const changeLanguage = (language: (typeof languages)[number]['code']) => {
    closeMenu()
    i18n.changeLanguage(language)
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: compact ? 8 : 10,
      }}
    >
      <Menu
        visible={openMenu === 'language'}
        onDismiss={closeMenu}
        anchorPosition="bottom"
        statusBarHeight={0}
        style={{ marginTop: 4 }}
        overlayAccessibilityLabel={t('preferences.closeMenu')}
        contentStyle={menuStyle}
        anchor={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('preferences.language')}
            accessibilityValue={{ text: currentLanguage.name }}
            accessibilityState={{ expanded: openMenu === 'language' }}
            onPress={() => setOpenMenu(openMenu === 'language' ? null : 'language')}
            style={({ pressed }) => ({
              minHeight: 48,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              paddingHorizontal: 13,
              borderRadius: 24,
              borderWidth: 1,
              borderColor: theme.colors.outline,
              backgroundColor: pressed ? theme.colors.primaryContainer : theme.colors.surface,
            })}
          >
            <Text style={{ fontSize: 21 }}>{currentLanguage.flag}</Text>

            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: theme.colors.onSurface,
              }}
            >
              {currentLanguage.label}
            </Text>

            <Icon
              source={openMenu === 'language' ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={theme.colors.onSurfaceVariant}
            />
          </Pressable>
        }
      >
        {languages.map(language => (
          <PreferenceRow
            key={language.code}
            label={language.name}
            selected={language.code === currentLanguage.code}
            leading={<Text style={{ fontSize: 24 }}>{language.flag}</Text>}
            onPress={() => changeLanguage(language.code)}
          />
        ))}
      </Menu>

      <Menu
        visible={openMenu === 'appearance'}
        onDismiss={closeMenu}
        anchorPosition="bottom"
        statusBarHeight={0}
        style={{ marginTop: 4 }}
        overlayAccessibilityLabel={t('preferences.closeMenu')}
        contentStyle={menuStyle}
        anchor={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('preferences.appearance')}
            accessibilityState={{ expanded: openMenu === 'appearance' }}
            onPress={() => setOpenMenu(openMenu === 'appearance' ? null : 'appearance')}
            style={({ pressed }) => ({
              width: 48,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 24,
              borderWidth: 1,
              borderColor: theme.colors.outline,
              backgroundColor: pressed ? theme.colors.primaryContainer : theme.colors.surface,
            })}
          >
            <Icon source="palette-outline" size={23} color={theme.colors.onSurface} />

            <View
              style={{
                position: 'absolute',
                right: 7,
                bottom: 7,
                width: 10,
                height: 10,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: theme.colors.surface,
                backgroundColor: theme.colors.primary,
              }}
            />
          </Pressable>
        }
      >
        <Text
          style={{
            paddingHorizontal: 14,
            paddingTop: 8,
            paddingBottom: 10,
            fontSize: 13,
            fontWeight: '600',
            color: theme.colors.onSurfaceVariant,
          }}
        >
          {t('preferences.color')}
        </Text>

        <PreferenceRow
          label={t('preferences.orange')}
          selected={themeColor === 'orange'}
          leading={
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: orangeColors[mode].primary,
              }}
            />
          }
          onPress={() => setThemeColor('orange')}
        />

        <PreferenceRow
          label={t('preferences.sage')}
          selected={themeColor === 'sage'}
          leading={
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: sageColors[mode].primary,
              }}
            />
          }
          onPress={() => setThemeColor('sage')}
        />

        <Divider
          style={{
            marginHorizontal: 12,
            marginVertical: 12,
            backgroundColor: theme.colors.outlineVariant,
          }}
        />

        <Text
          style={{
            paddingHorizontal: 14,
            paddingBottom: 10,
            fontSize: 13,
            fontWeight: '600',
            color: theme.colors.onSurfaceVariant,
          }}
        >
          {t('preferences.mode')}
        </Text>

        <PreferenceRow
          label={t('preferences.light')}
          selected={mode === 'light'}
          leading={<Icon source="white-balance-sunny" size={23} color={theme.colors.onSurface} />}
          onPress={() => setMode('light')}
        />

        <PreferenceRow
          label={t('preferences.dark')}
          selected={mode === 'dark'}
          leading={<Icon source="moon-waning-crescent" size={23} color={theme.colors.onSurface} />}
          onPress={() => setMode('dark')}
        />
      </Menu>
    </View>
  )
}
