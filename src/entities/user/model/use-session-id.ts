import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'

export const SESSION_COOKIE_KEY = 'session_id'
export const SESSION_CHANGE_EVENT = 'session-changed'

export const useSessionId = () => {
  const [sessionId, setSessionId] = useState<string | null>(
    () => Cookies.get(SESSION_COOKIE_KEY) || null
  )

  useEffect(() => {
    const handler = () => setSessionId(Cookies.get(SESSION_COOKIE_KEY) || null)
    window.addEventListener(SESSION_CHANGE_EVENT, handler)
    return () => window.removeEventListener(SESSION_CHANGE_EVENT, handler)
  }, [])

  return sessionId
}
