import { Theme, useMediaQuery } from '@mui/material'
import { FC, ReactNode } from 'react'

import { IMovie } from '@/shared/lib'

import { WatchListCard } from './watch-list-card'

interface IWatchListCardsProps {
  movies: IMovie[]
  /** `id` фильмов, у которых раскрыто описание. */
  expandedIds: number[]
  /**
   * Рисует дополнительные кнопки карточки. Эту функцию и обработчики ниже оборачивайте в `useCallback`,
   * иначе при каждом обновлении страницы перерисуются все карточки.
   */
  renderActions?: (movie: IMovie) => ReactNode
  onToggleDescription: (movieId: number) => void
  onRemove: (movieId: number) => void
}

/** Список карточек «К просмотру». На телефоне это билеты, на экранах от `sm` — строки. */
export const WatchListCards: FC<IWatchListCardsProps> = ({
  movies,
  expandedIds,
  renderActions,
  onToggleDescription,
  onRemove
}) => {
  // С `noSsr` размер экрана известен сразу. Без него телефон на мгновение показал бы вид для
  // широкого экрана.
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'), { noSsr: true })

  return movies.map((movie) => (
    <WatchListCard
      key={movie.id}
      movie={movie}
      isMobile={isMobile}
      isDescriptionOpen={expandedIds.includes(movie.id)}
      renderActions={renderActions}
      onToggleDescription={onToggleDescription}
      onRemove={onRemove}
    />
  ))
}
