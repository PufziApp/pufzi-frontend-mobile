import type { AuthSession } from '../../../services/auth/types/authTypes'

export type LoginRequest = {
  email: string
  password: string
  rememberMe: boolean
}

export type LoginResponse = AuthSession
