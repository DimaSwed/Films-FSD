import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNotification } from '@/shared/notifications'
import { movieApi } from '../api'
import { transformMovieDetails } from '../lib'
import { IMovieDetails } from './movie.types'

export const useMovie = (id: number) => {
  const { errors } = useNotification()
  const result = useQuery<IMovieDetails>({
    queryKey: ['movie', id],
    queryFn: async () => {
      const response = await movieApi.getById(id)
      return transformMovieDetails(response.data)
    },
    staleTime: 86400 * 1000
  })
  useEffect(() => {
    if (result.isError) errors('Ошибка загрузки фильма')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isError])
  return result
}
