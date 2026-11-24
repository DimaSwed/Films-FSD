import VisibilityIcon from '@mui/icons-material/Visibility'
import { Button } from '@mui/material'
import { FC } from 'react'

import { RateMovieTrigger } from './rate-movie-trigger'

interface IMarkWatchedButtonProps {
  movieId: number
  title: string
}

/** Кнопка «Просмотрено» для «К просмотру»: оценка переносит фильм в список просмотренных. */
export const MarkWatchedButton: FC<IMarkWatchedButtonProps> = ({ movieId, title }) => (
  <RateMovieTrigger movieId={movieId} title={title}>
    {(open) => (
      <Button
        variant="contained"
        color="success"
        startIcon={<VisibilityIcon />}
        aria-haspopup="dialog"
        onClick={open}
        sx={{ minWidth: '140px', lineHeight: '130%' }}
      >
        Просмотрено
      </Button>
    )}
  </RateMovieTrigger>
)
