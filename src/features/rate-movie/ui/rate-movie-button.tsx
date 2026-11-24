import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { Button, CircularProgress } from '@mui/material'
import { FC } from 'react'

import { useSessionId } from '@/entities/user'

import { formatUserRating } from '../lib'
import { useUserRating } from '../model'

import { RateMovieTrigger } from './rate-movie-trigger'

interface IRateMovieButtonProps {
  movieId: number
  title: string
}

/** Кнопка страницы фильма: «Оценить» или «Просмотрено · 8». */
export const RateMovieButton: FC<IRateMovieButtonProps> = ({ movieId, title }) => {
  const sessionId = useSessionId()
  const { userRating, isLoading } = useUserRating(movieId)
  const isRated = userRating !== null

  return (
    <RateMovieTrigger movieId={movieId} title={title}>
      {(open) => (
        <Button
          variant="contained"
          startIcon={
            isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : isRated ? (
              <StarIcon />
            ) : (
              <StarBorderIcon />
            )
          }
          aria-haspopup="dialog"
          aria-label={
            isRated
              ? `Просмотрено, ваша оценка ${formatUserRating(userRating)}. Изменить`
              : undefined
          }
          onClick={open}
          disabled={!sessionId || isLoading}
          sx={
            isRated
              ? {
                  bgcolor: 'warning.main',
                  color: 'common.black',
                  '&:hover': { bgcolor: 'warning.light' }
                }
              : undefined
          }
        >
          {isRated ? `Просмотрено · ${formatUserRating(userRating)}` : 'Оценить'}
        </Button>
      )}
    </RateMovieTrigger>
  )
}
