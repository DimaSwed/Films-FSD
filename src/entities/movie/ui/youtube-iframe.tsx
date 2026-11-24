import { Box } from '@mui/material'
import { FC, useEffect, useRef } from 'react'

import { getTrailerLabel, getYoutubeEmbedUrl } from '../lib'
import { type IMovieTrailer, useYoutubeAuthRequired } from '../model'

interface IYoutubeIframeProps {
  trailer: IMovieTrailer
  title: string
  focusOnMount?: boolean
  onAuthRequired: () => void
}

export const YoutubeIframe: FC<IYoutubeIframeProps> = ({
  trailer,
  title,
  focusOnMount = false,
  onAuthRequired
}) => {
  const ref = useRef<HTMLIFrameElement>(null)

  useYoutubeAuthRequired(ref, onAuthRequired)

  useEffect(() => {
    if (focusOnMount) ref.current?.focus({ preventScroll: true })
  }, [focusOnMount])

  return (
    <Box
      component="iframe"
      ref={ref}
      src={getYoutubeEmbedUrl(trailer.key)}
      title={`${getTrailerLabel(trailer)}: ${title}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      // Без referrer YouTube отказывается воспроизводить встроенное видео
      referrerPolicy="strict-origin-when-cross-origin"
      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
    />
  )
}
