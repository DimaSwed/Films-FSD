import { FC, useCallback, useState } from 'react'

import type { IMovieTrailer } from '../model'

import { TrailerAuthRequired } from './trailer-auth-required'
import { YoutubeIframe } from './youtube-iframe'

interface ITrailerFrameProps {
  trailer: IMovieTrailer
  title: string
  /** Перенести фокус в плеер при появлении. */
  focusOnMount?: boolean
}

/**
 * Плеер YouTube с автозапуском; если YouTube требует войти в аккаунт — пояснение и запасной путь.
 * Заполняет родителя (`position: relative` и пропорции задаёт он).
 */
export const TrailerFrame: FC<ITrailerFrameProps> = ({ trailer, title, focusOnMount }) => {
  const [isAuthRequired, setIsAuthRequired] = useState(false)
  const handleAuthRequired = useCallback(() => setIsAuthRequired(true), [])

  if (isAuthRequired) {
    return (
      <TrailerAuthRequired
        trailer={trailer}
        title={title}
        onRetry={() => setIsAuthRequired(false)}
      />
    )
  }

  return (
    <YoutubeIframe
      trailer={trailer}
      title={title}
      focusOnMount={focusOnMount}
      onAuthRequired={handleAuthRequired}
    />
  )
}
