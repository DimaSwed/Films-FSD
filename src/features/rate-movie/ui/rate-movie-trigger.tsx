import { Dialog, DialogTitle, Typography } from '@mui/material'
import { FC, ReactNode, useId, useState } from 'react'

import { RateMovieForm } from './rate-movie-form'

interface IRateMovieTriggerProps {
  movieId: number
  title: string
  /** Рисует кнопку, которая открывает окно оценки. */
  children: (open: () => void) => ReactNode
}

/** Окно оценки фильма вместе с кнопкой, которая его открывает. */
export const RateMovieTrigger: FC<IRateMovieTriggerProps> = ({ movieId, title, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const titleId = useId()

  const close = () => setIsOpen(false)

  return (
    <>
      {children(() => setIsOpen(true))}

      <Dialog open={isOpen} onClose={close} fullWidth maxWidth="xs" aria-labelledby={titleId}>
        <DialogTitle id={titleId} sx={{ pb: 1, overflowWrap: 'anywhere' }}>
          Оцените фильм
          <Typography component="span" variant="body2" sx={{ display: 'block', mt: 0.5 }}>
            {title}
          </Typography>
        </DialogTitle>
        <RateMovieForm movieId={movieId} onClose={close} />
      </Dialog>
    </>
  )
}
