import { createContext } from 'react'

import type { ThemeColor, ThemeMode } from './theme'

type ThemeContextType = {
  themeColor: ThemeColor
  mode: ThemeMode
  setThemeColor: (themeColor: ThemeColor) => void
  setMode: (mode: ThemeMode) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
