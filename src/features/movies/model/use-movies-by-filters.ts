import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { IMovie } from '@/shared/lib'
import { useNotification } from '@/shared/notifications'

import { moviesApi } from '../api'

import { IMoviesFilters } from './movies.types'

export const useMoviesByFilters = (params: IMoviesFilters) => {
  const { errors } = useNotification()
  const result = useQuery<IMovie[]>({
    queryKey: ['movies-by-filters', params],
    queryFn: async () => {
      const data = await moviesApi.getByFilters(params)
      return data
    },
    staleTime: 86400 * 1000
  })
  useEffect(() => {
    if (result.isError) errors('Ошибка загрузки фильмов')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isError])
  return result
}
