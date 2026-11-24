import { Button, DialogActions, DialogContent, Typography } from '@mui/material'
import { FC } from 'react'

import { formatUserRating } from '../lib'
import { useRateMovie, useRemoveRating, useUserRating } from '../model'

import { RatingScale } from './rating-scale'

interface IRateMovieFormProps {
  movieId: number
  onClose: () => void
}

/** Содержимое окна оценки. Отдельно от окна, чтобы оценка запрашивалась, только когда оно открыто. */
export const RateMovieForm: FC<IRateMovieFormProps> = ({ movieId, onClose }) => {
  const { userRating } = useUserRating(movieId)
  const { mutate: rate, isPending: isRating, variables } = useRateMovie()
  const { mutate: removeRating, isPending: isRemoving } = useRemoveRating()

  const isBusy = isRating || isRemoving
  const isRated = userRating !== null

  const handleSelect = (value: number) => {
    if (value === userRating) onClose()
    else rate({ movieId, value }, { onSuccess: onClose })
  }

  return (
    <>
      <DialogContent>
        <Typography sx={{ mb: 2 }}>
          {isRated
            ? `Ваша оценка: ${formatUserRating(userRating)} из 10`
            : 'Как вам фильм? 1 — совсем не понравился, 10 — отличный'}
        </Typography>
        <RatingScale
          value={isRating ? variables.value : userRating}
          disabled={isBusy}
          onSelect={handleSelect}
        />
        <Typography variant="body2" sx={{ mt: 2, opacity: 0.75 }}>
          Оценка сохранится в вашем аккаунте TMDB: фильм появится в «Просмотрено» и исчезнет из «К
          просмотру».
        </Typography>
      </DialogContent>
      <DialogActions>
        {isRated && (
          <Button
            color="inherit"
            disabled={isBusy}
            onClick={() => removeRating(movieId, { onSuccess: onClose })}
            sx={{ mr: 'auto' }}
          >
            Убрать оценку
          </Button>
        )}
        <Button color="inherit" onClick={onClose}>
          Закрыть
        </Button>
      </DialogActions>
    </>
  )
}
