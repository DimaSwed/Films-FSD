import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { moviesApi } from '@/features/movies'
import { useNotification } from '@/shared/notifications'

export const useUpcomingMovies = () => {
  const { errors } = useNotification()
  const result = useQuery({
    queryKey: ['movies', 'upcoming'],
    queryFn: moviesApi.getUpcoming,
    staleTime: 86400 * 1000
  })
  useEffect(() => {
    if (result.isError) errors('Ошибка загрузки ожидаемых фильмов')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isError])
  return result
}

export const useTopRatedMovies = () => {
  const { errors } = useNotification()
  const result = useQuery({
    queryKey: ['movies', 'top-rated'],
    queryFn: moviesApi.getTopRated,
    staleTime: 86400 * 1000
  })
  useEffect(() => {
    if (result.isError) errors('Ошибка загрузки топ фильмов')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isError])
  return result
}

export const useTrendingMovies = () => {
  const { errors } = useNotification()
  const result = useQuery({
    queryKey: ['movies', 'trending'],
    queryFn: moviesApi.getTrending,
    staleTime: 86400 * 1000
  })
  useEffect(() => {
    if (result.isError) errors('Ошибка загрузки трендов')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isError])
  return result
}

export const useNowPlayingMovies = () => {
  const { errors } = useNotification()
  const result = useQuery({
    queryKey: ['movies', 'now-playing'],
    queryFn: moviesApi.getNowPlaying,
    staleTime: 86400 * 1000
  })
  useEffect(() => {
    if (result.isError) errors('Ошибка загрузки фильмов в прокате')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isError])
  return result
}

export const usePopularMovies = () => {
  const { errors } = useNotification()
  const result = useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: moviesApi.getPopular,
    staleTime: 86400 * 1000
  })
  useEffect(() => {
    if (result.isError) errors('Ошибка загрузки популярных фильмов')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isError])
  return result
}
