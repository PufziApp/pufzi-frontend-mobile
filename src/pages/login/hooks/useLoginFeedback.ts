import { useEffect, useRef, useState } from 'react'

import { getLocalPauseUntil, getLoginFeedback, type LoginFeedback } from '../utils/loginFeedback'

type Notice = {
  email: string
  feedback: LoginFeedback
}

export const useLoginFeedback = (email: string) => {
  const key = email.trim().toLowerCase()
  const attempts = useRef<Record<string, number>>({})
  const [notice, setNotice] = useState<Notice | null>(null)
  const [accountPauses, setAccountPauses] = useState<Record<string, number>>({})
  const [serverPauseUntil, setServerPauseUntil] = useState(0)
  const [now, setNow] = useState(Date.now)
  const accountPauseUntil = accountPauses[key] ?? 0
  const pauseUntil = Math.max(accountPauseUntil, serverPauseUntil)
  const remainingSeconds = Math.max(0, Math.ceil((pauseUntil - now) / 1000))
  const isPaused = remainingSeconds > 0

  useEffect(() => {
    setNow(Date.now())

    if (pauseUntil <= Date.now()) {
      return
    }

    const timer = setInterval(() => {
      const currentTime = Date.now()
      setNow(currentTime)

      if (currentTime >= pauseUntil) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [pauseUntil])

  const clearFeedback = () => setNotice(null)

  const recordFailure = (error: unknown, submittedEmail: string) => {
    const submittedKey = submittedEmail.trim().toLowerCase()
    const currentTime = Date.now()
    let feedback = getLoginFeedback(error, currentTime)

    if (feedback.kind === 'credentials') {
      const count = (attempts.current[submittedKey] ?? 0) + 1
      attempts.current[submittedKey] = count
      const localPauseUntil = getLocalPauseUntil(count, currentTime)

      if (localPauseUntil) {
        attempts.current[submittedKey] = 0
        feedback = { kind: 'rateLimited', retryAt: localPauseUntil }
        setAccountPauses(current => ({ ...current, [submittedKey]: localPauseUntil }))
      }
    } else if (feedback.retryAt) {
      const retryAt = feedback.retryAt

      if (feedback.kind === 'rateLimited') {
        setServerPauseUntil(retryAt)
      } else if (feedback.kind === 'locked') {
        setAccountPauses(current => ({ ...current, [submittedKey]: retryAt }))
      }
    }

    setNow(currentTime)
    setNotice({ email: submittedKey, feedback })
  }

  const recordSuccess = (submittedEmail: string) => {
    const submittedKey = submittedEmail.trim().toLowerCase()
    delete attempts.current[submittedKey]
    setAccountPauses(current => {
      const next = { ...current }
      delete next[submittedKey]
      return next
    })
    setServerPauseUntil(0)
    setNotice(null)
  }

  const activeNotice = notice?.email === key ? notice.feedback : null
  const expiredNotice = activeNotice?.retryAt !== undefined && activeNotice.retryAt <= now
  const feedback = isPaused
    ? { kind: 'rateLimited' as const, retryAt: pauseUntil }
    : expiredNotice
    ? null
    : activeNotice

  return {
    feedback,
    isPaused,
    remainingSeconds,
    clearFeedback,
    recordFailure,
    recordSuccess,
  }
}
