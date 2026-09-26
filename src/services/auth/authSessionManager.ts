import type { AuthSession } from './types/authTypes'

type SessionListener = (session: AuthSession | null) => void

let currentSession: AuthSession | null = null
let sessionListener: SessionListener | null = null

export const authSessionManager = {
  getSession() {
    return currentSession
  },

  setSession(session: AuthSession | null) {
    currentSession = session
    sessionListener?.(session)
  },

  getAccessToken() {
    return currentSession?.accessToken ?? null
  },

  subscribe(listener: SessionListener) {
    sessionListener = listener

    return () => {
      if (sessionListener === listener) {
        sessionListener = null
      }
    }
  },
}
