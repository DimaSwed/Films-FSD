import StarIcon from '@mui/icons-material/Star'
import { Button } from '@mui/material'
import { FC } from 'react'

import { formatUserRating } from '../lib'

import { RateMovieTrigger } from './rate-movie-trigger'

interface IUserRatingButtonProps {
  movieId: number
  title: string
  /** Оценка из самого списка: без отдельного запроса на каждую карточку. */
  userRating: number
}

/** Оценка пользователя на карточке «Просмотрено»; по нажатию её можно изменить или убрать. */
export const UserRatingButton: FC<IUserRatingButtonProps> = ({ movieId, title, userRating }) => (
  <RateMovieTrigger movieId={movieId} title={title}>
    {(open) => (
      <Button
        fullWidth
        color="inherit"
        startIcon={<StarIcon sx={{ color: 'warning.main' }} />}
        aria-haspopup="dialog"
        aria-label={`Ваша оценка ${formatUserRating(userRating)}. Изменить: ${title}`}
        onClick={open}
        sx={{ color: 'secondary.contrastText', textTransform: 'none', lineHeight: 1.2 }}
      >
        Моя: {formatUserRating(userRating)}
      </Button>
    )}
  </RateMovieTrigger>
)
