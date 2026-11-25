import { memo, ReactNode } from 'react'

import { useWatchProviders } from '@/entities/movie'
import { IMovie } from '@/shared/lib'

import { WatchListRow } from './watch-list-row'
import { WatchListTicket } from './watch-list-ticket'

interface IWatchListCardProps {
  movie: IMovie
  isMobile: boolean
  isDescriptionOpen: boolean
  renderActions?: (movie: IMovie) => ReactNode
  onToggleDescription: (movieId: number) => void
  onRemove: (movieId: number) => void
}

/**
 * Карточка фильма в списке «К просмотру».
 *
 * Обёрнута в `memo`: в списке бывают сотни карточек, и при удалении или поиске незачем перерисовывать
 * те, что не изменились. Чтобы это работало, функции в пропсах не должны создаваться заново.
 */
export const WatchListCard = memo(function WatchListCard({
  movie,
  isMobile,
  isDescriptionOpen,
  renderActions,
  onToggleDescription,
  onRemove
}: IWatchListCardProps) {
  const { data: providers } = useWatchProviders(movie.id)

  const View = isMobile ? WatchListTicket : WatchListRow

  return (
    <View
      movie={movie}
      providers={providers?.flatrate ?? []}
      actions={renderActions?.(movie)}
      isDescriptionOpen={isDescriptionOpen}
      onToggleDescription={() => onToggleDescription(movie.id)}
      onRemove={() => onRemove(movie.id)}
    />
  )
})
