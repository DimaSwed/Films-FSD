import { ReactNode } from 'react'

import { IWatchProvider } from '@/entities/movie'
import { IMovie } from '@/shared/lib'

/** У карточки два вида: «билет» на телефоне и строка на широком экране. Пропсы у них одинаковые. */
export interface IWatchListCardViewProps {
  movie: IMovie
  /** Сервисы, где фильм доступен по подписке. */
  providers: IWatchProvider[]
  /** Дополнительные кнопки. Какие именно, решает страница. */
  actions?: ReactNode
  isDescriptionOpen: boolean
  onToggleDescription: () => void
  onRemove: () => void
}
