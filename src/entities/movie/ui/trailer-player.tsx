import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { Box, ButtonBase } from '@mui/material'
import { FC, SyntheticEvent, useState } from 'react'

import { getTrailerLabel, getYoutubePreviewUrl } from '../lib'
import type { IMovieTrailer } from '../model'

import { TrailerFrame } from './trailer-frame'

interface ITrailerPlayerProps {
  trailer: IMovieTrailer
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

/**
 * Лёгкий трейлер: до нажатия — только картинка, плеер YouTube загружается по клику.
 * Заполняет родителя: размер задаёт он (`position: relative` и пропорции).
 */
export const TrailerPlayer: FC<ITrailerPlayerProps> = ({
  trailer,
  title,
  placeholder,
  isPlaying,
  onPlay
}) => {
  const [isPreviewReady, setIsPreviewReady] = useState(false)

  const handlePreviewLoad = ({ currentTarget }: SyntheticEvent<HTMLImageElement>) =>
    setIsPreviewReady(currentTarget.naturalWidth > YOUTUBE_STUB_WIDTH)

  if (isPlaying) {
    // Плеер подменяет собой нажатую кнопку — забирает фокус, иначе он теряется
    return <TrailerFrame focusOnMount trailer={trailer} title={title} />
  }

  return (
    <ButtonBase
      onClick={onPlay}
      aria-label={`Смотреть ${getTrailerLabel(trailer).toLowerCase()}: ${title}`}
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
        src={getYoutubePreviewUrl(trailer.key)}
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
