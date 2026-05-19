import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { movieApi } from '@/features/movie'
import { transformMovieDetails } from '@/features/movie/'
import { IMovieDetails } from '@/features/movie'
import { useNotification } from '@/shared/notifications'

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
