import { useState, useMemo, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SelectChangeEvent } from '@mui/material'
import { watchListApi } from '../api'
import { filterAndSortMovies } from '../lib'
import { useSessionId, useUserDetails } from '@/entities/user'

const BATCH_SIZE = 20

export const useWatchList = () => {
  const sessionId = useSessionId()
  const { data: user } = useUserDetails()

  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
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
    () => filterAndSortMovies(data ?? [], { genre: selectedGenre, year: selectedYear }),
    [data, selectedGenre, selectedYear]
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

  const handleResetFilters = useCallback(() => {
    setSelectedGenre('')
    setSelectedYear('')
    setVisibleCount(BATCH_SIZE)
  }, [])

  return {
    visibleMovies,
    filteredMovies,
    selectedGenre,
    selectedYear,
    handleGenreChange,
    handleYearChange,
    handleResetFilters,
    handleScrollEnd,
    isLoading,
    isError,
    isFetched
  }
}
