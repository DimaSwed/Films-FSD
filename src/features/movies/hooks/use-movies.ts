import { useQuery } from '@tanstack/react-query'
import { moviesApi } from '@/features/movies/api/movies-api'

export const useUpcomingMovies = () => {
  return useQuery({
    queryKey: ['movies', 'upcoming'],
    queryFn: moviesApi.getUpcoming,
    staleTime: 86400 * 1000 // 24 часа
  })
}

export const useTopRatedMovies = () => {
  return useQuery({
    queryKey: ['movies', 'top-rated'],
    queryFn: moviesApi.getTopRated,
    staleTime: 86400 * 1000
  })
}

export const useTrendingMovies = () => {
  return useQuery({
    queryKey: ['movies', 'trending'],
    queryFn: moviesApi.getTrending,
    staleTime: 86400 * 1000
  })
}

export const useNowPlayingMovies = () => {
  return useQuery({
    queryKey: ['movies', 'now-playing'],
    queryFn: moviesApi.getNowPlaying,
    staleTime: 86400 * 1000
  })
}

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: moviesApi.getPopular,
    staleTime: 86400 * 1000
  })
}
