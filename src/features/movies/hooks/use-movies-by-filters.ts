import { useQuery } from '@tanstack/react-query'
import { moviesApi } from '@/features/movies'

import { IMoviesFilters } from '@/features/movies/types'
import { IMovie } from '@/shared/types'

export const useMoviesByFilters = (params: IMoviesFilters) => {
  return useQuery<IMovie[]>({
    queryKey: ['movies-by-filters', params],
    queryFn: async () => {
      const data = await moviesApi.getByFilters(params)
      return data
    },

    staleTime: 86400 * 1000 // 24 часа
  })
}
