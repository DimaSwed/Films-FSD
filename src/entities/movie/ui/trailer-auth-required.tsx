import { Button, Stack, Typography } from '@mui/material'
import { FC, useEffect, useRef } from 'react'

import type { IMovieTrailer } from '../model'

import { YoutubeLinkButton } from './youtube-link-button'

interface ITrailerAuthRequiredProps {
  trailer: IMovieTrailer
  title: string
  onRetry: () => void
}

/** Вместо плеера, когда YouTube не показывает ролик без входа: сам он отсюда войти не даёт. */
export const TrailerAuthRequired: FC<ITrailerAuthRequiredProps> = ({ trailer, title, onRetry }) => {
  const linkRef = useRef<HTMLAnchorElement>(null)

  // Плеер исчез вместе с фокусом. Если фокус был в другом месте — не перехватываем
  useEffect(() => {
    if (document.activeElement === document.body) linkRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <Stack
      role="alert"
      sx={{
        position: 'absolute',
        inset: 0,
        overflowY: 'auto',
        // safe: если текст не поместился, верх остаётся доступен прокруткой
        justifyContent: 'safe center',
        alignItems: 'center',
        gap: { xs: 1, sm: 1.5 },
        p: 1.5,
        textAlign: 'center',
        color: 'common.white',
        bgcolor: 'common.black'
      }}
    >
      <Typography sx={{ fontWeight: 500, lineHeight: 1.25 }}>
        YouTube не показывает ролик без входа в аккаунт
      </Typography>
      {/* Кнопки выше пояснения: в узкой карточке без прокрутки видно только начало */}
      <Stack direction="row" sx={{ flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
        <YoutubeLinkButton ref={linkRef} trailer={trailer} title={title} variant="text" />
        <Button size="small" variant="outlined" color="inherit" onClick={onRetry}>
          Повторить
        </Button>
      </Stack>
      <Typography variant="body2" sx={{ maxWidth: 460, opacity: 0.8, lineHeight: 1.35 }}>
        Так бывает из-за VPN. Отключите его или войдите на YouTube в этом браузере и нажмите
        «Повторить».
      </Typography>
    </Stack>
  )
}
