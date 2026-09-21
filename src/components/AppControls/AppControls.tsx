import { View } from 'react-native'

import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher'
import { ThemeColorSwitcher } from '../ThemeColorSwitcher/ThemeColorSwitcher'
import { ThemeModeSwitcher } from '../ThemeModeSwitcher/ThemeModeSwitcher'

import { useTheme } from 'react-native-paper'

export const AppControls = () => {
  const theme = useTheme()

  return (
    <View
      style={{
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 20,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.outlineVariant,
      }}
    >
      <ThemeModeSwitcher />
      <ThemeColorSwitcher />
      <LanguageSwitcher />
    </View>
  )
}
