import { FC } from 'react'

import { FavoriteToggleIcon } from '@/features/favorites'
import { WatchlistToggleIcon } from '@/features/watch-list'

interface IMovieCardActionsProps {
  movieId: number
}

/** Действия карточки фильма: избранное и «к просмотру». Передаётся в слот `actions` SmallMovieCard. */
export const MovieCardActions: FC<IMovieCardActionsProps> = ({ movieId }) => (
  <>
    <FavoriteToggleIcon movieId={movieId} size="large" />
    <WatchlistToggleIcon movieId={movieId} size="large" />
  </>
)
