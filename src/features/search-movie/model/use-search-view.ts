import { useHistoryState } from '@/shared/lib'

import { CRITERIA_MAP, RECOMMENDATION_MAP } from './search.types'

const DEFAULT_RECOMMENDATION = 'recommendations'

interface ISearchView {
  query: string
  genre: number | ''
  country: string
  year: string
  recommendation: string
  /** Нажатая кнопка «Новое», «Высокий рейтинг» или «Лучшее». Пустая строка — ни одна не нажата. */
  criteria: string
  /** Сортировку меняют и список «Рекомендуемые», и кнопки критериев. Действует последний выбор. */
  sortBy: string
}

const INITIAL_VIEW: ISearchView = {
  query: '',
  genre: '',
  country: '',
  year: '',
  recommendation: DEFAULT_RECOMMENDATION,
  criteria: '',
  sortBy: RECOMMENDATION_MAP[DEFAULT_RECOMMENDATION]
}

/** Текст поиска и фильтры страницы «Поиск». При возврате «назад» они остаются прежними. */
export const useSearchView = () => {
  const [view, setView] = useHistoryState('search', INITIAL_VIEW)

  const update = (patch: Partial<ISearchView>) => setView((prev) => ({ ...prev, ...patch }))

  return {
    view,
    setQuery: (query: string) => update({ query }),
    setGenre: (genre: number | '') => update({ genre }),
    setCountry: (country: string) => update({ country }),
    setYear: (year: string) => update({ year }),
    setRecommendation: (recommendation: string) =>
      update({ recommendation, sortBy: RECOMMENDATION_MAP[recommendation] }),
    /** `null` — кнопку отжали. Тогда снова действует сортировка из списка «Рекомендуемые». */
    setCriteria: (criteria: string | null) =>
      setView((prev) => ({
        ...prev,
        criteria: criteria ?? '',
        sortBy: criteria ? CRITERIA_MAP[criteria] : RECOMMENDATION_MAP[prev.recommendation]
      }))
  }
}
