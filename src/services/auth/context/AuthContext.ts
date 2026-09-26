import { createContext } from 'react'

import type { AuthSession } from '../types/authTypes'

type AuthContextValue = {
  session: AuthSession | null
  isAuthLoading: boolean
  isAuthenticated: boolean
  setAuthSession: (session: AuthSession) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
