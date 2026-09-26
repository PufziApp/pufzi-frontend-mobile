import { useEffect, useState, type ReactNode } from 'react'

import { AuthContext } from './AuthContext'
import { logoutApi } from '../api/logoutApi'
import { refreshApi } from '../api/refreshApi'
import { authSessionManager } from '../authSessionManager'
import { authStorage } from '../storage/authStorage'
import type { AuthSession } from '../types/authTypes'

type Props = {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    return authSessionManager.subscribe(newSession => {
      setSession(newSession)
    })
  }, [])

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedSession = await authStorage.getSession()

        if (!storedSession || !storedSession.rememberMe) {
          authSessionManager.setSession(null)
          await authStorage.clearSession()
          return
        }

        const now = Date.now()
        const accessTokenExpiresAt = new Date(storedSession.accessTokenExpiresAt).getTime()

        if (accessTokenExpiresAt > now) {
          authSessionManager.setSession(storedSession)
          return
        }

        const refreshTokenExpiresAt = new Date(storedSession.refreshTokenExpiresAt).getTime()

        if (refreshTokenExpiresAt <= now) {
          authSessionManager.setSession(null)
          await authStorage.clearSession()
          return
        }

        const refreshedSession = await refreshApi({
          refreshToken: storedSession.refreshToken,
        })

        authSessionManager.setSession(refreshedSession)
        await authStorage.saveSession(refreshedSession)
      } catch {
        authSessionManager.setSession(null)
        await authStorage.clearSession()
      } finally {
        setIsAuthLoading(false)
      }
    }

    restoreSession()
  }, [])

  const setAuthSession = async (newSession: AuthSession) => {
    authSessionManager.setSession(newSession)

    if (newSession.rememberMe) {
      await authStorage.saveSession(newSession)
      return
    }

    await authStorage.clearSession()
  }

  const logout = async () => {
    const currentSession = authSessionManager.getSession()

    authSessionManager.setSession(null)
    await authStorage.clearSession()

    if (currentSession?.refreshToken) {
      try {
        await logoutApi(currentSession.refreshToken)
      } catch {
        // User is already logged out locally
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthLoading,
        isAuthenticated: session !== null,
        setAuthSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
