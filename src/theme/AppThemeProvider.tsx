import { useState, type ReactNode } from 'react'
import { PaperProvider } from 'react-native-paper'

import { getTheme, type ThemeColor, type ThemeMode } from './theme'
import { ThemeContext } from './ThemeContext'

type Props = {
  children: ReactNode
}

export const AppThemeProvider = ({ children }: Props) => {
  const [themeColor, setThemeColor] = useState<ThemeColor>('sage')
  const [mode, setMode] = useState<ThemeMode>('light')

  const theme = getTheme(themeColor, mode)

  return (
    <ThemeContext.Provider value={{ themeColor, mode, setThemeColor, setMode }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  )
}
