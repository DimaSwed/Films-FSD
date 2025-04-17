import { useState, useMemo, useCallback, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SelectChangeEvent } from '@mui/material'

import { watchListApi } from '@/features/watch-list/'
import { useSessionId } from '@/features/auth'
import { useUserDetails } from '@/features/user'

import { IMovie, IPaginatedResponse } from '@/shared/types'
import { useSearchParams } from 'react-router-dom'

export const useWatchList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10))
  const sessionId = useSessionId()
  const { data: user } = useUserDetails()

  const {
    data: watchlistData,
    isLoading,
    isError,
    error
  } = useQuery<IPaginatedResponse<IMovie>>({
    queryKey: ['watchlist', sessionId, user?.id, currentPage],
    queryFn: () => {
      if (!sessionId || !user?.id) {
        return Promise.reject(new Error('Требуется авторизация'))
      }
      return watchListApi.getWatchlistMovies(sessionId, user.id, currentPage)
    },
    enabled: !!sessionId && !!user?.id,
    placeholderData: (previousData) => previousData
  })

  useEffect(() => {
    if (!searchParams.has('page')) {
      setSearchParams({ page: '1' }, { replace: true })
    }
  }, [searchParams, setSearchParams])

  useEffect(() => {
    const newPage = parseInt(searchParams.get('page') || '1', 10)
    if (newPage !== currentPage) {
      setCurrentPage(newPage)
    }
  }, [searchParams, currentPage])

  const handlePageChange = useCallback(
    (page: number) => {
      setSearchParams({ page: page.toString() }, { replace: false })
    },
    [setSearchParams]
  )

  const filteredMovies = useMemo(() => {
    if (!watchlistData || !('results' in watchlistData)) return []

    const validMovies = watchlistData.results.filter(
      (movie: IMovie) => movie.title && movie.year > 0
    )
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
  }, [watchlistData, selectedGenre, selectedYear])

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
    currentPage,
    totalPages: watchlistData && 'total_pages' in watchlistData ? watchlistData.total_pages : 1,
    handleGenreChange,
    handleYearChange,
    handleResetFilters,
    handlePageChange,
    isLoading,
    isError,
    error
  }
}
