import * as Keychain from 'react-native-keychain'

import type { AuthSession } from '../types/authTypes'

const AUTH_SERVICE = 'pufzi.auth'

export const authStorage = {
  saveSession: async (session: AuthSession) => {
    await Keychain.setGenericPassword('pufzi', JSON.stringify(session), {
      service: AUTH_SERVICE,
    })
  },

  getSession: async (): Promise<AuthSession | null> => {
    const credentials = await Keychain.getGenericPassword({
      service: AUTH_SERVICE,
    })

    if (!credentials) {
      return null
    }

    return JSON.parse(credentials.password) as AuthSession
  },

  clearSession: async () => {
    await Keychain.resetGenericPassword({
      service: AUTH_SERVICE,
    })
  },
}
