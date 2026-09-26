import { Pressable, View } from 'react-native'

import { orangeColors, sageColors } from '../../theme/colors'
import { useAppTheme } from '../../theme/useAppTheme'

export const ThemeColorSwitcher = () => {
  const { themeColor, mode, setThemeColor } = useAppTheme()

  const handleThemeChange = () => {
    setThemeColor(themeColor === 'orange' ? 'sage' : 'orange')
  }

  const color = themeColor === 'orange' ? orangeColors[mode].primary : sageColors[mode].primary

  return (
    <Pressable
      onPress={handleThemeChange}
      hitSlop={8}
      style={{
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          backgroundColor: color,
        }}
      />
    </Pressable>
  )
}
