// import { useState, useMemo, useCallback, useEffect } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { SelectChangeEvent } from '@mui/material'

// import { watchListApi } from '@/features/watch-list/'
// import { useSessionId } from '@/features/auth'
// import { useUserDetails } from '@/features/user'

// import { IMovie, IPaginatedResponse } from '@/shared/types'
// import { useSearchParams } from 'react-router-dom'

// export const useWatchList = () => {
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [selectedGenre, setSelectedGenre] = useState<string>('')
//   const [selectedYear, setSelectedYear] = useState<string>('')
//   const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10))
//   const sessionId = useSessionId()
//   const { data: user } = useUserDetails()

//   const {
//     data: watchlistData,
//     isLoading,
//     isError,
//     error
//   } = useQuery<IPaginatedResponse<IMovie>>({
//     queryKey: ['watchlist', sessionId, user?.id, currentPage],
//     queryFn: () => {
//       if (!sessionId || !user?.id) {
//         return Promise.reject(new Error('Требуется авторизация'))
//       }
//       return watchListApi.getWatchlistMovies(sessionId, user.id, currentPage)
//     },
//     enabled: !!sessionId && !!user?.id,
//     placeholderData: (previousData) => previousData
//   })

//   useEffect(() => {
//     if (!searchParams.has('page')) {
//       setSearchParams({ page: '1' }, { replace: true })
//     }
//   }, [searchParams, setSearchParams])

//   useEffect(() => {
//     const newPage = parseInt(searchParams.get('page') || '1', 10)
//     if (newPage !== currentPage) {
//       setCurrentPage(newPage)
//     }
//   }, [searchParams, currentPage])

//   const handlePageChange = useCallback(
//     (page: number) => {
//       setSearchParams({ page: page.toString() }, { replace: false })
//     },
//     [setSearchParams]
//   )

//   const filteredMovies = useMemo(() => {
//     if (!watchlistData || !('results' in watchlistData)) return []

//     const validMovies = watchlistData.results.filter(
//       (movie: IMovie) => movie.title && movie.year > 0
//     )
//     let updatedMovies = [...validMovies]

//     if (selectedGenre) {
//       updatedMovies = updatedMovies.filter(
//         (movie) => movie.genre && movie.genre.includes(selectedGenre)
//       )
//     }

//     if (selectedYear) {
//       if (selectedYear === 'до 1980') {
//         updatedMovies = updatedMovies.filter((movie) => movie.year < 1980)
//       } else if (selectedYear.includes('-')) {
//         const [startYear, endYear] = selectedYear.split('-').map(Number)
//         updatedMovies = updatedMovies.filter(
//           (movie) => movie.year >= startYear && movie.year <= endYear
//         )
//       } else {
//         updatedMovies = updatedMovies.filter((movie) => movie.year === Number(selectedYear))
//       }
//     }

//     updatedMovies.sort((a, b) => {
//       if (a.releaseDate && b.releaseDate) {
//         return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
//       }
//       if (!a.releaseDate) return 1
//       if (!b.releaseDate) return -1
//       return 0
//     })

//     return updatedMovies
//   }, [watchlistData, selectedGenre, selectedYear])

//   const handleGenreChange = useCallback((event: SelectChangeEvent<string>) => {
//     setSelectedGenre(event.target.value)
//   }, [])

//   const handleYearChange = useCallback((event: SelectChangeEvent<string>) => {
//     setSelectedYear(event.target.value)
//   }, [])

//   const handleResetFilters = useCallback(() => {
//     setSelectedGenre('')
//     setSelectedYear('')
//   }, [])

//   return {
//     filteredMovies,
//     selectedGenre,
//     selectedYear,
//     currentPage,
//     totalPages: watchlistData && 'total_pages' in watchlistData ? watchlistData.total_pages : 1,
//     handleGenreChange,
//     handleYearChange,
//     handleResetFilters,
//     handlePageChange,
//     isLoading,
//     isError,
//     error
//   }
// }
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

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['watchlist-all', sessionId, user?.id],
    queryFn: async () => {
      if (!sessionId || !user?.id) throw new Error('Требуется авторизация')

      let allMovies: IMovie[] = []
      let page = 1
      let totalPages = 1

      do {
        const response = await watchListApi.getWatchlistMovies(sessionId, user.id, page)
        allMovies = [...allMovies, ...response.results]
        totalPages = response.total_pages
        page++
      } while (page <= totalPages)

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
    error
  }
}
