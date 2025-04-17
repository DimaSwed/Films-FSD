import { useQuery } from '@tanstack/react-query'
import { movieApi } from '@/features/movie'
import { transformMovieDetails } from '@/features/movie/'
import { IMovieDetails } from '@/features/movie'

export const useMovie = (id: number) => {
  return useQuery<IMovieDetails>({
    queryKey: ['movie', id],
    queryFn: async () => {
      const response = await movieApi.getById(id)
      return transformMovieDetails(response.data)
    },
    staleTime: 86400 * 1000
  })
}
