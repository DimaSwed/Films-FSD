import { ReactNode } from 'react'

import { IMovie } from '@/shared/lib'

/** У карточки два вида: «билет» на телефоне и строка на широком экране. Пропсы у них одинаковые. */
export interface IWatchListCardViewProps {
  movie: IMovie
  /** Строка «где смотреть» (`WatchProvidersStrip`). Вид решает только, где её поставить. */
  watchProviders: ReactNode
  /** Дополнительные кнопки. Какие именно, решает страница. */
  actions?: ReactNode
  isDescriptionOpen: boolean
  onToggleDescription: () => void
  onRemove: () => void
}
