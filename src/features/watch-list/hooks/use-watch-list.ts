import { useState, useMemo, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SelectChangeEvent } from '@mui/material'

import { watchListApi } from '@/features/watch-list/'
import { useSessionId } from '@/features/auth'
import { useUserDetails } from '@/features/user'

import { IMovie } from '@/shared/types'

export const useWatchList = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  const sessionId = useSessionId()
  const { data: user } = useUserDetails()

  const {
    data: watchlistMovies,
    isLoading,
    isError,
    error
  } = useQuery<IMovie[]>({
    queryKey: ['watchlist', sessionId, user?.id],
    queryFn: () => {
      if (!sessionId || !user?.id) {
        return Promise.reject(new Error('Требуется авторизация'))
      }
      return watchListApi.getWatchlistMovies(sessionId, user.id)
    },
    enabled: !!sessionId && !!user?.id
  })

  const filteredMovies = useMemo(() => {
    if (!watchlistMovies) return []

    const validMovies = watchlistMovies.filter((movie) => movie.title && movie.year > 0)
    let updatedMovies = [...validMovies]

    if (selectedGenre) {
      updatedMovies = updatedMovies.filter(
        (movie) => movie.genre && movie.genre.includes(selectedGenre)
      )
    }

    if (selectedYear) {
      if (selectedYear === 'до 1980') {
        updatedMovies = updatedMovies.filter((movie) => movie.year < 1980)
      } else if (selectedYear.includes('-')) {
        const [startYear, endYear] = selectedYear.split('-').map(Number)
        updatedMovies = updatedMovies.filter(
          (movie) => movie.year >= startYear && movie.year <= endYear
        )
      } else {
        updatedMovies = updatedMovies.filter((movie) => movie.year === Number(selectedYear))
      }
    }

    updatedMovies.sort((a, b) => {
      if (a.releaseDate && b.releaseDate) {
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      }
      if (!a.releaseDate) return 1
      if (!b.releaseDate) return -1
      return 0
    })

    return updatedMovies
  }, [watchlistMovies, selectedGenre, selectedYear])

  const handleGenreChange = useCallback((event: SelectChangeEvent<string>) => {
    setSelectedGenre(event.target.value)
  }, [])

  const handleYearChange = useCallback((event: SelectChangeEvent<string>) => {
    setSelectedYear(event.target.value)
  }, [])

  const handleResetFilters = useCallback(() => {
    setSelectedGenre('')
    setSelectedYear('')
  }, [])

  return {
    filteredMovies,
    selectedGenre,
    selectedYear,
    handleGenreChange,
    handleYearChange,
    handleResetFilters,
    isLoading,
    isError,
    error
  }
}
