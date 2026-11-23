import { SelectChangeEvent } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState, useMemo, useCallback } from 'react'

import { useSessionId, useUserDetails } from '@/entities/user'
import { TMovieSort } from '@/shared/lib'

import { watchListApi } from '../api'
import { filterAndSortMovies } from '../lib'

const BATCH_SIZE = 20
// Как было раньше: сначала новые релизы.
const DEFAULT_SORT: TMovieSort = 'release-desc'

export const useWatchList = () => {
  const sessionId = useSessionId()
  const { data: user } = useUserDetails()

  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<TMovieSort>(DEFAULT_SORT)
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)

  const { data, isLoading, isError, isFetched } = useQuery({
    queryKey: ['watchlist-all', sessionId, user?.id],
    queryFn: () => {
      if (!sessionId || !user?.id) throw new Error('Требуется авторизация')
      return watchListApi.getAllWatchlistMovies(sessionId, user.id)
    },
    enabled: !!sessionId && !!user?.id,
    staleTime: 1000 * 60 * 5
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
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredMovies.length))
    }
  }, [visibleCount, filteredMovies.length])

  const handleGenreChange = useCallback((e: SelectChangeEvent<string>) => {
    setSelectedGenre(e.target.value)
    setVisibleCount(BATCH_SIZE)
  }, [])

  const handleYearChange = useCallback((e: SelectChangeEvent<string>) => {
    setSelectedYear(e.target.value)
    setVisibleCount(BATCH_SIZE)
  }, [])

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value)
    setVisibleCount(BATCH_SIZE)
  }, [])

  const handleSortChange = useCallback((value: TMovieSort) => {
    setSort(value)
    setVisibleCount(BATCH_SIZE)
  }, [])

  const handleResetFilters = useCallback(() => {
    setSelectedGenre('')
    setSelectedYear('')
    setQuery('')
    setSort(DEFAULT_SORT)
    setVisibleCount(BATCH_SIZE)
  }, [])

  return {
    visibleMovies,
    filteredMovies,
    selectedGenre,
    selectedYear,
    query,
    sort,
    totalCount: data?.length ?? 0,
    handleGenreChange,
    handleYearChange,
    handleQueryChange,
    handleSortChange,
    handleResetFilters,
    handleScrollEnd,
    isLoading,
    isError,
    isFetched
  }
}
