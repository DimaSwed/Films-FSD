import YouTubeIcon from '@mui/icons-material/YouTube'
import { IconButton, Tooltip } from '@mui/material'
import { memo } from 'react'

import { IMovie } from '@/shared/lib'

import { getYoutubeWatchUrl } from '../lib'
import type { IMovieTrailer } from '../model'

import { TrailerCardLayout } from './trailer-card-layout'
import { TrailerCardTitle } from './trailer-card-title'
import { TrailerPlayer } from './trailer-player'

interface ITrailerCardProps {
  movie: IMovie
  trailer: IMovieTrailer
  isPlaying: boolean
  onPlay: (movieId: number) => void
}

const TYPE_LABELS: Record<IMovieTrailer['type'], string> = { Trailer: 'Трейлер', Teaser: 'Тизер' }
const LANGUAGE_LABELS = { ru: 'на русском', en: 'на английском' }

const getMeta = ({ year }: IMovie, { type, language }: IMovieTrailer) => {
  const label = language ? `${TYPE_LABELS[type]} ${LANGUAGE_LABELS[language]}` : TYPE_LABELS[type]
  return year ? `${year} · ${label}` : label
}

// memo: список перерисовывается на каждый загруженный ролик, а меняются одна-две карточки
export const TrailerCard = memo(({ movie, trailer, isPlaying, onPlay }: ITrailerCardProps) => (
  <TrailerCardLayout
    media={
      <TrailerPlayer
        key={trailer.key}
        videoKey={trailer.key}
        title={movie.title}
        placeholder={movie.backdrop || movie.image}
        isPlaying={isPlaying}
        onPlay={() => onPlay(movie.id)}
      />
    }
    action={
      // Запасной путь: владелец ролика мог запретить встраивание
      <Tooltip title="Открыть на YouTube">
        <IconButton
          component="a"
          href={getYoutubeWatchUrl(trailer.key)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Открыть трейлер на YouTube: ${movie.title}`}
          color="inherit"
        >
          <YouTubeIcon />
        </IconButton>
      </Tooltip>
    }
  >
    <TrailerCardTitle movie={movie} meta={getMeta(movie, trailer)} />
  </TrailerCardLayout>
))

TrailerCard.displayName = 'TrailerCard'
