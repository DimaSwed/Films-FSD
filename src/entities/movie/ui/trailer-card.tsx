import { memo } from 'react'

import { IMovie } from '@/shared/lib'

import { getTrailerLabel } from '../lib'
import type { IMovieTrailer } from '../model'

import { TrailerCardLayout } from './trailer-card-layout'
import { TrailerCardTitle } from './trailer-card-title'
import { TrailerPlayer } from './trailer-player'
import { YoutubeLinkButton } from './youtube-link-button'

interface ITrailerCardProps {
  movie: IMovie
  trailer: IMovieTrailer
  isPlaying: boolean
  onPlay: (movieId: number) => void
}

const LANGUAGE_LABELS = { ru: 'на русском', en: 'на английском' }

const getMeta = ({ year }: IMovie, trailer: IMovieTrailer) => {
  const { language } = trailer
  const type = getTrailerLabel(trailer)
  const label = language ? `${type} ${LANGUAGE_LABELS[language]}` : type
  return year ? `${year} · ${label}` : label
}

// memo: список перерисовывается на каждый загруженный ролик, а меняются одна-две карточки
export const TrailerCard = memo(({ movie, trailer, isPlaying, onPlay }: ITrailerCardProps) => (
  <TrailerCardLayout
    media={
      <TrailerPlayer
        key={trailer.key}
        trailer={trailer}
        title={movie.title}
        placeholder={movie.backdrop || movie.image}
        isPlaying={isPlaying}
        onPlay={() => onPlay(movie.id)}
      />
    }
    action={<YoutubeLinkButton trailer={trailer} title={movie.title} />}
  >
    <TrailerCardTitle movie={movie} meta={getMeta(movie, trailer)} />
  </TrailerCardLayout>
))

TrailerCard.displayName = 'TrailerCard'
