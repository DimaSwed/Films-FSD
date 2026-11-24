import { RefObject, useEffect } from 'react'

import { YOUTUBE_LISTEN_MESSAGE, YOUTUBE_PLAYER_ORIGIN, isYoutubeAuthRequired } from '../lib'

const LISTEN_INTERVAL_MS = 500
/** 10 секунд. Недоступный YouTube не ответит никогда — без предела опрос шёл бы, пока открыт плеер. */
const MAX_LISTEN_ATTEMPTS = 20

/** Вызывает `onAuthRequired`, когда плеер YouTube в `iframeRef` требует войти в аккаунт. */
export const useYoutubeAuthRequired = (
  iframeRef: RefObject<HTMLIFrameElement | null>,
  onAuthRequired: () => void
) => {
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    let timer: number | undefined
    let attempts = 0

    const stop = () => window.clearInterval(timer)

    const sayListening = () => {
      attempts += 1
      if (attempts >= MAX_LISTEN_ATTEMPTS) stop()
      iframe.contentWindow?.postMessage(YOUTUBE_LISTEN_MESSAGE, YOUTUBE_PLAYER_ORIGIN)
    }

    // Скрипт плеера может запуститься позже события load — повторяем, пока он не ответит
    const handleLoad = () => {
      stop()
      attempts = 0
      sayListening()
      timer = window.setInterval(sayListening, LISTEN_INTERVAL_MS)
    }

    const handleMessage = ({ source, origin, data }: MessageEvent) => {
      if (source !== iframe.contentWindow || origin !== YOUTUBE_PLAYER_ORIGIN) return
      stop()
      if (isYoutubeAuthRequired(data)) onAuthRequired()
    }

    iframe.addEventListener('load', handleLoad)
    window.addEventListener('message', handleMessage)
    return () => {
      stop()
      iframe.removeEventListener('load', handleLoad)
      window.removeEventListener('message', handleMessage)
    }
  }, [iframeRef, onAuthRequired])
}
