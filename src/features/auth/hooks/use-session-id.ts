import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export const SESSION_CHANGE_EVENT = 'session-changed'

export const useSessionId = () => {
  const [sessionId, setSessionId] = useState<string | null>(() => Cookies.get('session_id') || null)

  useEffect(() => {
    const handler = () => setSessionId(Cookies.get('session_id') || null)
    window.addEventListener(SESSION_CHANGE_EVENT, handler)
    return () => window.removeEventListener(SESSION_CHANGE_EVENT, handler)
  }, [])

  return sessionId
}
