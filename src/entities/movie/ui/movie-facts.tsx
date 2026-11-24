import { Box, Typography } from '@mui/material'
import { FC } from 'react'

import { formatDate, formatDuration, formatMoney, formatVotes } from '../lib'
import type { IMovieDetails } from '../model'

interface IMovieFactsProps {
  movie: IMovieDetails
}

const UNKNOWN = 'Неизвестно'

/** Основные факты показываем всегда, остальные — только если TMDB их знает. */
const getFacts = (movie: IMovieDetails): { label: string; value: string | null }[] => {
  const releaseDateRu = formatDate(movie.releaseDateRu)

  return [
    { label: 'Дата релиза', value: formatDate(movie.releaseDate) ?? UNKNOWN },
    {
      label: 'Прокат в России',
      value: releaseDateRu && `с ${releaseDateRu}`
    },
    { label: 'Жанр', value: movie.genre || UNKNOWN },
    {
      label: 'Рейтинг TMDB',
      value:
        movie.voteCount > 0
          ? `${movie.rating.toFixed(1)} (${formatVotes(movie.voteCount)})`
          : 'Пока нет оценок'
    },
    { label: 'Длительность', value: movie.duration > 0 ? formatDuration(movie.duration) : UNKNOWN },
    {
      label: movie.countries.length > 1 ? 'Страны' : 'Страна',
      value: movie.countries.join(', ') || null
    },
    {
      label: movie.directors.length > 1 ? 'Режиссёры' : 'Режиссёр',
      value: movie.directors.join(', ') || null
    },
    { label: 'Бюджет', value: movie.budget > 0 ? formatMoney(movie.budget) : null },
    { label: 'Возраст', value: movie.ageRating }
  ]
}

export const MovieFacts: FC<IMovieFactsProps> = ({ movie }) => (
  <Box
    component="dl"
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
      gap: 2,
      m: 0
    }}
  >
    {getFacts(movie).map(
      ({ label, value }) =>
        value && (
          <div key={label}>
            <Typography component="dt" variant="subtitle1" sx={{ opacity: 0.8 }}>
              {label}
            </Typography>
            <Typography component="dd" variant="body2" sx={{ m: 0, mt: 0.5 }}>
              {value}
            </Typography>
          </div>
        )
    )}
  </Box>
)
