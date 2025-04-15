import { useQuery } from '@tanstack/react-query'
import { searchApi } from '@/features/search-movie/api/search-api'
import { IMovie } from '@/shared/types/common.types'
import { IMovieFilterParams, IMoviesResponseData } from '@/features/search-movie/types/search.types'

export const useSearchMovies = (query: string) => {
  return useQuery<IMoviesResponseData>({
    queryKey: ['search-movies', query],
    queryFn: () => searchApi.searchMovies(query),
    enabled: !!query,
    staleTime: 86400 * 1000
  })
}

export const useMoviesByFilters = (params: IMovieFilterParams) => {
  return useQuery<IMovie[]>({
    queryKey: ['movies-by-filters', params],
    queryFn: () =>
      searchApi.fetchByFilters({
        ...params,
        'primary_release_date.lte': new Date().toISOString().split('T')[0]
      }),
    staleTime: 86400 * 1000
  })
}
