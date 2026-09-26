import type { AuthSession } from './authTypes'

export type GoogleLoginRequest = {
  idToken: string
}

export type GoogleLoginResponse = AuthSession
