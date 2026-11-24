import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { Badge, CircularProgress, IconButton } from '@mui/material'
import { FC } from 'react'

import { useSessionId } from '@/entities/user'

import { formatUserRating } from '../lib'
import { useUserRating } from '../model'

import { RateMovieTrigger } from './rate-movie-trigger'

interface IRateMovieIconProps {
  movieId: number
  title: string
}

/** Звезда на карточке: пустая — не оценён, с числом — ваша оценка. */
export const RateMovieIcon: FC<IRateMovieIconProps> = ({ movieId, title }) => {
  const sessionId = useSessionId()
  const { userRating, isLoading } = useUserRating(movieId)
  const isRated = userRating !== null

  return (
    <RateMovieTrigger movieId={movieId} title={title}>
      {(open) => (
        <IconButton
          aria-haspopup="dialog"
          aria-label={
            isRated
              ? `Просмотрено, ваша оценка ${formatUserRating(userRating)}. Изменить`
              : 'Оценить и отметить просмотренным'
          }
          onClick={open}
          disabled={!sessionId || isLoading}
          sx={{
            color: isRated ? 'warning.main' : 'grey',
            '&:hover': { backgroundColor: 'transparent' },
            '&.Mui-disabled': { color: 'grey.400' },
            '& .MuiBadge-badge': {
              minWidth: 16,
              height: 16,
              px: '4px',
              fontSize: 10,
              fontWeight: 'bold',
              bgcolor: 'warning.main',
              color: 'common.black'
            }
          }}
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : isRated ? (
            <Badge badgeContent={formatUserRating(userRating)}>
              <StarIcon />
            </Badge>
          ) : (
            <StarBorderIcon />
          )}
        </IconButton>
      )}
    </RateMovieTrigger>
  )
}
