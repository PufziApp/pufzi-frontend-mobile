import type { AuthSession } from './authTypes'

export type RefreshRequest = {
  refreshToken: string
}

export type RefreshResponse = AuthSession
