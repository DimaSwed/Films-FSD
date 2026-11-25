import { FC } from 'react'

import { FavoriteToggleIcon } from '@/features/favorites'
import { RateMovieIcon } from '@/features/rate-movie'
import { WatchlistToggleIcon } from '@/features/watch-list'
import { IMovie } from '@/shared/lib'

interface IMovieCardActionsProps {
  movie: IMovie
}

/**
 * Действия карточки фильма: избранное, «к просмотру» и оценка. Передаётся в слот `actions`
 * SmallMovieCard. Состояние всех трёх приходит одним запросом (`account_states`).
 * Спиннеры того же размера, что и иконки (24 px). Иначе после загрузки карточки меняли бы высоту.
 */
export const MovieCardActions: FC<IMovieCardActionsProps> = ({ movie }) => (
  <>
    <FavoriteToggleIcon movieId={movie.id} />
    <WatchlistToggleIcon movieId={movie.id} />
    <RateMovieIcon movieId={movie.id} title={movie.title} />
  </>
)
