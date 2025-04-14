// use-movie.ts
import { useQuery } from '@tanstack/react-query'
import { movieApi } from '@/features/movie/api/movie-api'
import { transformMovieDetails } from '@/features/movie/lib/transform-movie'
import { IMovieDetails } from '@/features/movie/types/movie.types'

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
