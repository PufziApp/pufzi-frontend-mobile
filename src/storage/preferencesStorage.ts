import AsyncStorage from '@react-native-async-storage/async-storage'

import { STORAGE_KEYS } from './storageKeys'

export const preferenceStorage = {
  async hasCompletedOnboarding() {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.onboardingCompleted)

    return value === 'true'
  },

  async completeOnboarding() {
    await AsyncStorage.setItem(STORAGE_KEYS.onboardingCompleted, 'true')
  },
}
