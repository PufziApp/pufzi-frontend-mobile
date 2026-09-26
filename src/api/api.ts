import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'

import { refreshApi } from '../services/auth/api/refreshApi'
import { authSessionManager } from '../services/auth/authSessionManager'
import { authStorage } from '../services/auth/storage/authStorage'
import type { AuthSession } from '../services/auth/types/authTypes'

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean
}

export const api = axios.create({
  baseURL: 'http://10.0.2.2:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

let refreshPromise: Promise<AuthSession> | null = null

api.interceptors.request.use(config => {
  const accessToken = authSessionManager.getAccessToken()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

api.interceptors.response.use(
  response => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig | undefined

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error)
    }

    const session = authSessionManager.getSession()

    if (!session) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      if (!refreshPromise) {
        refreshPromise = refreshApi({
          refreshToken: session.refreshToken,
        })
      }

      const refreshedSession = await refreshPromise

      authSessionManager.setSession(refreshedSession)

      if (refreshedSession.rememberMe) {
        await authStorage.saveSession(refreshedSession)
      }

      originalRequest.headers.Authorization = `Bearer ${refreshedSession.accessToken}`

      return api(originalRequest)
    } catch (refreshError) {
      authSessionManager.setSession(null)
      await authStorage.clearSession()

      return Promise.reject(refreshError)
    } finally {
      refreshPromise = null
    }
  },
)
