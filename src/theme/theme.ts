import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper'

import { orangeColors, sageColors } from './colors'

export type ThemeColor = 'orange' | 'sage'
export type ThemeMode = 'light' | 'dark'

const themes = {
  orange: orangeColors,
  sage: sageColors,
}

export const getTheme = (themeColor: ThemeColor, mode: ThemeMode): MD3Theme => {
  const colors = themes[themeColor][mode]
  const baseTheme = mode === 'light' ? MD3LightTheme : MD3DarkTheme

  return {
    ...baseTheme,
    roundness: 4,

    colors: {
      ...baseTheme.colors,

      primary: colors.primary,
      primaryContainer: colors.primaryContainer,

      background: colors.background,
      surface: colors.surface,

      onBackground: colors.text,
      onSurface: colors.text,
      onSurfaceVariant: colors.textSecondary,

      secondary: colors.success,
      tertiary: colors.warning,

      error: colors.error,

      outline: colors.outline,
      outlineVariant: colors.outline,
    },
  }
}
