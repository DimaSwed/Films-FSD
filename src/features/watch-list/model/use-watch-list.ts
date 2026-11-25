import { SelectChangeEvent } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useCallback } from 'react'

import { getWatchlistKey } from '@/entities/movie'
import { useSessionId, useUserDetails } from '@/entities/user'
import { BACK_NAVIGATION_GC_TIME } from '@/shared/config'
import { TMovieSort, useHistoryState } from '@/shared/lib'

import { watchListApi } from '../api'
import { filterAndSortMovies, shareMoviesById } from '../lib'

const BATCH_SIZE = 20
// Как было раньше: сначала новые релизы.
const DEFAULT_SORT: TMovieSort = 'release-desc'

interface IWatchListView {
  selectedGenre: string
  selectedYear: string
  query: string
  sort: TMovieSort
  /** Сколько карточек показано сейчас. При прокрутке вниз их становится больше. */
  visibleCount: number
}

const INITIAL_VIEW: IWatchListView = {
  selectedGenre: '',
  selectedYear: '',
  query: '',
  sort: DEFAULT_SORT,
  visibleCount: BATCH_SIZE
}

export const useWatchList = () => {
  const sessionId = useSessionId()
  const { data: user } = useUserDetails()

  // Запоминаем вид списка, чтобы при возврате «назад» показать его таким же
  const [{ selectedGenre, selectedYear, query, sort, visibleCount }, setView] = useHistoryState(
    'watch-list',
    INITIAL_VIEW
  )

  // У каких фильмов раскрыто описание. Тоже запоминаем: с описанием карточка выше, и без него
  // при возврате открылось бы другое место списка.
  const [expandedIds, setExpandedIds] = useHistoryState<number[]>('watch-list-expanded', [])

  /** Меняет поиск, фильтры или сортировку. Число показанных карточек сбрасывается к начальному. */
  const updateView = (patch: Partial<IWatchListView>) =>
    setView((prev) => ({ ...prev, visibleCount: BATCH_SIZE, ...patch }))

  const { data, isLoading, isError } = useQuery({
    queryKey: getWatchlistKey(sessionId, user?.id),
    queryFn: () => {
      if (!sessionId || !user?.id) throw new Error('Требуется авторизация')
      return watchListApi.getAllWatchlistMovies(sessionId, user.id)
    },
    enabled: !!sessionId && !!user?.id,
    staleTime: 1000 * 60 * 5,
    gcTime: BACK_NAVIGATION_GC_TIME,
    structuralSharing: shareMoviesById
  })

  const filteredMovies = useMemo(
    () =>
      filterAndSortMovies(data ?? [], {
        genre: selectedGenre,
        year: selectedYear,
        query,
        sort
      }),
    [data, selectedGenre, selectedYear, query, sort]
  )

  const visibleMovies = useMemo(
    () => filteredMovies.slice(0, visibleCount),
    [filteredMovies, visibleCount]
  )

  const handleScrollEnd = useCallback(() => {
    if (visibleCount < filteredMovies.length) {
      setView((prev) => ({
        ...prev,
        visibleCount: Math.min(prev.visibleCount + BATCH_SIZE, filteredMovies.length)
      }))
    }
  }, [visibleCount, filteredMovies.length, setView])

  // `useCallback` здесь нужен: карточки обёрнуты в `memo`, и с новой функцией они бы перерисовались
  const handleToggleDescription = useCallback(
    (movieId: number) =>
      setExpandedIds((prev) =>
        prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
      ),
    [setExpandedIds]
  )

  const handleGenreChange = (e: SelectChangeEvent<string>) =>
    updateView({ selectedGenre: e.target.value })

  const handleYearChange = (e: SelectChangeEvent<string>) =>
    updateView({ selectedYear: e.target.value })

  const handleQueryChange = (value: string) => updateView({ query: value })

  const handleSortChange = (value: TMovieSort) => updateView({ sort: value })

  const handleResetFilters = () => updateView(INITIAL_VIEW)

  const hasActiveFilters =
    !!selectedGenre || !!selectedYear || !!query.trim() || sort !== DEFAULT_SORT

  return {
    visibleMovies,
    expandedIds,
    selectedGenre,
    selectedYear,
    query,
    sort,
    hasActiveFilters,
    totalCount: data?.length ?? 0,
    handleToggleDescription,
    handleGenreChange,
    handleYearChange,
    handleQueryChange,
    handleSortChange,
    handleResetFilters,
    handleScrollEnd,
    isLoading,
    isError
  }
}
