import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchApi } from '@/features/search-movie'
import { IMovie } from '@/shared/types'
import { IMovieFilterParams, IMoviesResponseData } from '@/features/search-movie'
import { useNotification } from '@/shared/notifications'

export const useSearchMovies = (query: string) => {
  const { errors } = useNotification()
  const result = useQuery<IMoviesResponseData>({
    queryKey: ['search-movies', query],
    queryFn: () => searchApi.searchMovies(query),
    enabled: !!query,
    staleTime: 86400 * 1000
  })
  useEffect(() => {
    if (result.isError) errors('Ошибка при поиске фильмов')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isError])
  return result
}

export const useMoviesByFilters = (params: IMovieFilterParams) => {
  const { errors } = useNotification()
  const result = useQuery<IMovie[]>({
    queryKey: ['movies-by-filters', params],
    queryFn: () =>
      searchApi.fetchByFilters({
        ...params,
        'primary_release_date.lte': new Date().toISOString().split('T')[0]
      }),
    staleTime: 86400 * 1000
  })
  useEffect(() => {
    if (result.isError) errors('Ошибка загрузки фильмов по фильтрам')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isError])
  return result
}
