import { useEffect } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { queryClient } from './src/api/queryClient'
import { AppThemeProvider } from './src/theme/AppThemeProvider'
import { RootNavigator } from './src/navigation/RootNavigator'
import { configureGoogleAuth } from './src/config/googleAuth'
import { AuthProvider } from './src/services/auth/context/AuthProvider'

import './src/i18n'

const App = () => {
  useEffect(() => {
    configureGoogleAuth()
  }, [])

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>
          <AuthProvider>
            <RootNavigator />
          </AuthProvider>
        </AppThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}

export default App
