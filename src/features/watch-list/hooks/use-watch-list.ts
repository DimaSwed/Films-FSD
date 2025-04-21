import { useState, useMemo, useCallback, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SelectChangeEvent } from '@mui/material'
import { watchListApi } from '@/features/watch-list'
import { useSessionId } from '@/features/auth'
import { useUserDetails } from '@/features/user'
import { IMovie } from '@/shared/types'

const BATCH_SIZE = 20

export const useWatchList = () => {
  const sessionId = useSessionId()
  const { data: user } = useUserDetails()

  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)

  const allMoviesRef = useRef<IMovie[]>([])

  const { data, isLoading, isError, error, isFetched } = useQuery({
    queryKey: ['watchlist-all', sessionId, user?.id],
    queryFn: async () => {
      if (!sessionId || !user?.id) throw new Error('Требуется авторизация')

      let allMovies: IMovie[] = []
      let page = 1
      let totalPages = 1

      do {
        const response = await watchListApi.getWatchlistMovies(sessionId, user.id, page)
        if (!response.results) throw new Error('Пустой ответ от сервера')

        allMovies = [...allMovies, ...response.results]
        totalPages = response.total_pages
        page++
      } while (page <= totalPages)

      if (allMovies.length === 0) throw new Error('Список фильмов пуст')

      allMoviesRef.current = allMovies
      return allMovies
    },
    enabled: !!sessionId && !!user?.id,
    staleTime: 1000 * 60 * 5
  })

  const filteredMovies = useMemo(() => {
    let movies = data ?? []

    if (selectedGenre) {
      movies = movies.filter((movie) => movie.genre?.includes(selectedGenre))
    }

    if (selectedYear) {
      if (selectedYear === 'до 1980') {
        movies = movies.filter((movie) => movie.year < 1980)
      } else if (selectedYear.includes('-')) {
        const [start, end] = selectedYear.split('-').map(Number)
        movies = movies.filter((movie) => movie.year >= start && movie.year <= end)
      } else {
        movies = movies.filter((movie) => movie.year === Number(selectedYear))
      }
    }

    movies.sort((a, b) => {
      if (!a.releaseDate) return 1
      if (!b.releaseDate) return -1
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    })

    return movies
  }, [selectedGenre, selectedYear, data])

  const visibleMovies = useMemo(() => {
    return filteredMovies.slice(0, visibleCount)
  }, [filteredMovies, visibleCount])

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
    error,
    isFetched
  }
}
