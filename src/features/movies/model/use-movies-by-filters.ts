import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { IMovie } from '@/shared/lib'
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
      const data = await moviesApi.getByFilters(params)
      return data
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
