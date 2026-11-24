import YouTubeIcon from '@mui/icons-material/YouTube'
import { Button, IconButton, Tooltip } from '@mui/material'
import { FC, Ref } from 'react'

import { getTrailerLabel, getYoutubeWatchUrl } from '../lib'
import type { IMovieTrailer } from '../model'

interface IYoutubeLinkButtonProps {
  trailer: IMovieTrailer
  title: string
  /** `icon` — значок с подсказкой, `text` — основная кнопка с подписью. */
  variant?: 'icon' | 'text'
  ref?: Ref<HTMLAnchorElement>
}

const TEXT = 'Открыть на YouTube'

/** Запасной путь к ролику: владелец мог запретить встраивание, а YouTube — потребовать вход. */
export const YoutubeLinkButton: FC<IYoutubeLinkButtonProps> = ({
  trailer,
  title,
  variant = 'icon',
  ref
}) => {
  const linkProps = {
    ref,
    component: 'a',
    href: getYoutubeWatchUrl(trailer.key),
    target: '_blank',
    rel: 'noopener noreferrer',
    'aria-label': `${TEXT}: ${getTrailerLabel(trailer).toLowerCase()} «${title}»`
  } as const

  if (variant === 'text') {
    return (
      <Button {...linkProps} size="small" variant="contained" color="error">
        {TEXT}
      </Button>
    )
  }

  return (
    <Tooltip title={TEXT}>
      <IconButton {...linkProps} color="inherit">
        <YouTubeIcon />
      </IconButton>
    </Tooltip>
  )
}
