import { useWatchList } from '@/features/watch-list'
import { useMemo } from 'react'

export const useIsInWatchlist = (movieId: number): boolean => {
  const { filteredMovies } = useWatchList()
  return useMemo(
    () => filteredMovies?.some((m) => m.id === movieId) ?? false,
    [filteredMovies, movieId]
  )
}
