import { IconButton } from 'react-native-paper'

import { useAppTheme } from '../../theme/useAppTheme'

export const ThemeModeSwitcher = () => {
  const { mode, setMode } = useAppTheme()

  const handleModeChange = () => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }

  return (
    <IconButton
      icon={mode === 'dark' ? 'weather-night' : 'weather-sunny'}
      size={22}
      onPress={handleModeChange}
    />
  )
}
