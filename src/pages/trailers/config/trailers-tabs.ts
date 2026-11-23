import type { TMovieCategory } from '@/features/movies'

/** Вкладки страницы; первая открывается по умолчанию. */
export const TRAILERS_TABS: { category: TMovieCategory; label: string }[] = [
  { category: 'upcoming', label: 'Скоро' },
  { category: 'now-playing', label: 'В прокате' },
  { category: 'popular', label: 'Популярные' }
]

export const TRAILERS_PANEL_ID = 'trailers-panel'

export const getTrailersTabId = (category: TMovieCategory) => `trailers-tab-${category}`
