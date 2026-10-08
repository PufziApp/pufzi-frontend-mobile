export type LoginFeedbackKind =
  | 'credentials'
  | 'locked'
  | 'rateLimited'
  | 'network'
  | 'unavailable'
  | 'denied'
  | 'invalidRequest'

export type LoginFeedback = {
  kind: LoginFeedbackKind
  retryAt?: number
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

export const parseRetryAfter = (value: unknown, now = Date.now()): number | undefined => {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return undefined
  }

  const text = String(value).trim()

  if (!text) {
    return undefined
  }

  const seconds = Number(text)

  if (Number.isFinite(seconds)) {
    return seconds > 0 ? now + seconds * 1000 : undefined
  }

  const date = Date.parse(text)

  return Number.isFinite(date) && date > now ? date : undefined
}

// Map standard HTTP responses; do not display raw server messages to the user.
export const getLoginFeedback = (error: unknown, now = Date.now()): LoginFeedback => {
  if (!isRecord(error)) {
    return { kind: 'unavailable' }
  }

  const response = isRecord(error.response) ? error.response : undefined

  if (!response) {
    return {
      kind:
        error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT'
          ? 'network'
          : 'unavailable',
    }
  }

  const headers = isRecord(response.headers) ? response.headers : undefined
  const retryAt = parseRetryAfter(headers?.['retry-after'] ?? headers?.['Retry-After'], now)

  switch (response.status) {
    case 401:
      return { kind: 'credentials' }
    case 423:
      return { kind: 'locked', retryAt }
    case 429:
      return { kind: 'rateLimited', retryAt }
    case 403:
      return { kind: 'denied' }
    case 400:
    case 422:
      return { kind: 'invalidRequest' }
    default:
      return { kind: 'unavailable' }
  }
}

export const MAX_FAILED_ATTEMPTS = 10
export const LOCAL_PAUSE_MS = 60_000

export const getLocalPauseUntil = (attempts: number, now = Date.now()) =>
  attempts >= MAX_FAILED_ATTEMPTS ? now + LOCAL_PAUSE_MS : undefined
