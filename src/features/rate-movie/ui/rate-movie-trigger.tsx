import { FC, ReactNode, useState } from 'react'

import { RateMovieDialog } from './rate-movie-dialog'

interface IRateMovieTriggerProps {
  movieId: number
  title: string
  /** Рисует кнопку, которая открывает окно оценки. */
  children: (open: () => void) => ReactNode
}

/** Окно оценки фильма вместе с кнопкой, которая его открывает. */
export const RateMovieTrigger: FC<IRateMovieTriggerProps> = ({ movieId, title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {children(() => setIsOpen(true))}
      <RateMovieDialog
        movieId={movieId}
        title={title}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
