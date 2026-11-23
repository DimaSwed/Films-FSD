import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { Box, ButtonBase } from '@mui/material'
import { FC, SyntheticEvent, useState } from 'react'

import { getYoutubeEmbedUrl, getYoutubePreviewUrl } from '../lib'

interface ITrailerPlayerProps {
  /** Идентификатор ролика на YouTube. */
  videoKey: string
  title: string
  /** Картинка под превью YouTube: видна, пока оно не загрузилось, и если не загрузится вовсе. */
  placeholder?: string
  isPlaying: boolean
  onPlay: () => void
}

/** Для удалённого ролика YouTube отдаёт не ошибку, а серую заглушку шириной 120 px. */
const YOUTUBE_STUB_WIDTH = 120

const imageSx = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover'
} as const

/** Плеер подменяет собой нажатую кнопку — возвращаем фокус, иначе он теряется. */
const focusOnMount = (node: HTMLIFrameElement | null) => node?.focus({ preventScroll: true })

/**
 * Лёгкий трейлер: до нажатия — только картинка, плеер YouTube загружается по клику.
 * Заполняет родителя: размер задаёт он (`position: relative` и пропорции).
 */
export const TrailerPlayer: FC<ITrailerPlayerProps> = ({
  videoKey,
  title,
  placeholder,
  isPlaying,
  onPlay
}) => {
  const [isPreviewReady, setIsPreviewReady] = useState(false)

  const handlePreviewLoad = ({ currentTarget }: SyntheticEvent<HTMLImageElement>) =>
    setIsPreviewReady(currentTarget.naturalWidth > YOUTUBE_STUB_WIDTH)

  if (isPlaying) {
    return (
      <Box
        component="iframe"
        ref={focusOnMount}
        src={getYoutubeEmbedUrl(videoKey)}
        title={`Трейлер: ${title}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        // Без referrer YouTube отказывается воспроизводить встроенное видео
        referrerPolicy="strict-origin-when-cross-origin"
        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
      />
    )
  }

  return (
    <ButtonBase
      onClick={onPlay}
      aria-label={`Смотреть трейлер: ${title}`}
      sx={{
        position: 'absolute',
        inset: 0,
        '&.Mui-focusVisible': { outline: '3px solid #fff', outlineOffset: '-3px' },
        '& .trailer-play': { transition: 'background-color 0.2s' },
        '@media (hover: hover)': {
          '&:hover .trailer-play': { bgcolor: 'error.main' }
        }
      }}
    >
      {placeholder && (
        <Box
          component="img"
          src={placeholder}
          alt=""
          loading="lazy"
          decoding="async"
          sx={imageSx}
        />
      )}
      {/* Прозрачно до загрузки: при замедленном YouTube запрос может висеть без ошибки */}
      <Box
        component="img"
        src={getYoutubePreviewUrl(videoKey)}
        alt=""
        loading="lazy"
        decoding="async"
        onLoad={handlePreviewLoad}
        sx={{ ...imageSx, opacity: isPreviewReady ? 1 : 0 }}
      />
      <Box
        className="trailer-play"
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 64,
          height: 64,
          borderRadius: '50%',
          color: 'common.white',
          bgcolor: 'rgba(0, 0, 0, 0.7)'
        }}
      >
        <PlayArrowRoundedIcon sx={{ fontSize: 40 }} />
      </Box>
    </ButtonBase>
  )
}
