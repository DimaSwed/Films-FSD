import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { getNextTmdbPage, IMovie, selectUniqueMovies } from '@/shared/lib'
import { useNotification } from '@/shared/notifications'

import { moviesApi } from '../api'

import { IMoviesFilters } from './movies.types'

interface IUseMoviesByFiltersOptions {
  /** `false` — не делать запрос (например, пока параметры невалидны). */
  enabled?: boolean
}

export const useMoviesByFilters = (
  params: IMoviesFilters,
  { enabled = true }: IUseMoviesByFiltersOptions = {}
) => {
  const { errors } = useNotification()
  const result = useQuery<IMovie[]>({
    queryKey: ['movies-by-filters', params],
    queryFn: async () => {
      const { results } = await moviesApi.getByFilters(params)
      return results
    },
    enabled,
    staleTime: 86400 * 1000
  })
  useEffect(() => {
    if (result.isError) errors('Ошибка загрузки фильмов')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isError])
  return result
}

/** Та же выборка, но с бесконечной прокруткой: серверная пагинация TMDB, по странице за запрос. */
export const useInfiniteMoviesByFilters = (
  params: IMoviesFilters,
  { enabled = true }: IUseMoviesByFiltersOptions = {}
) => {
  const { errors } = useNotification()
  const result = useInfiniteQuery({
    queryKey: ['movies-by-filters-infinite', params],
    queryFn: ({ pageParam }) => moviesApi.getByFilters(params, pageParam),
    initialPageParam: 1,
    getNextPageParam: getNextTmdbPage,
    select: selectUniqueMovies,
    enabled,
    staleTime: 86400 * 1000
  })
  useEffect(() => {
    if (result.isError) errors('Ошибка загрузки фильмов')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isError])
  return result
}
