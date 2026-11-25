import { Dialog, DialogTitle, Typography } from '@mui/material'
import { FC, useId } from 'react'

import { RateMovieForm } from './rate-movie-form'

interface IRateMovieDialogProps {
  movieId: number
  title: string
  isOpen: boolean
  onClose: () => void
}

/** Окно оценки фильма. */
export const RateMovieDialog: FC<IRateMovieDialogProps> = ({ movieId, title, isOpen, onClose }) => {
  const titleId = useId()

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs" aria-labelledby={titleId}>
      <DialogTitle id={titleId} sx={{ pb: 1, overflowWrap: 'anywhere' }}>
        Оцените фильм
        <Typography component="span" variant="body2" sx={{ display: 'block', mt: 0.5 }}>
          {title}
        </Typography>
      </DialogTitle>
      <RateMovieForm movieId={movieId} onClose={onClose} />
    </Dialog>
  )
}
