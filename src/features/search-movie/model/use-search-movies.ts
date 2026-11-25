import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { BACK_NAVIGATION_GC_TIME } from '@/shared/config'
import { getNextTmdbPage, IMovie, selectUniqueMovies } from '@/shared/lib'
import { useNotification } from '@/shared/notifications'

import { searchApi } from '../api'

import { IMovieFilterParams } from './search.types'

/** Быстрый поиск в шапке: только первая страница выдачи. */
export const useSearchMovies = (query: string) => {
  const { errors } = useNotification()
  const result = useQuery<IMovie[]>({
    queryKey: ['search-movies', query],
    queryFn: async () => (await searchApi.searchMovies(query)).results,
    enabled: !!query,
    staleTime: 86400 * 1000
  })
  useEffect(() => {
    if (result.isError) errors('Ошибка при поиске фильмов')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isError])
  return result
}

/** Поиск по названию на странице «Поиск»: бесконечная прокрутка. */
export const useInfiniteSearchMovies = (query: string) => {
  const { errors } = useNotification()
  const result = useInfiniteQuery({
    queryKey: ['search-movies-infinite', query],
    queryFn: ({ pageParam }) => searchApi.searchMovies(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: getNextTmdbPage,
    select: selectUniqueMovies,
    enabled: !!query,
    staleTime: 86400 * 1000,
    gcTime: BACK_NAVIGATION_GC_TIME
  })
  useEffect(() => {
    if (result.isError) errors('Ошибка при поиске фильмов')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isError])
  return result
}

/** Подбор по фильтрам на странице «Поиск»: бесконечная прокрутка. `enabled: false` — когда идёт поиск по названию. */
export const useMoviesByFilters = (params: IMovieFilterParams, { enabled = true } = {}) => {
  const { errors } = useNotification()
  const result = useInfiniteQuery({
    queryKey: ['search-movies-by-filters', params],
    queryFn: ({ pageParam }) => searchApi.fetchByFilters(params, pageParam),
    initialPageParam: 1,
    getNextPageParam: getNextTmdbPage,
    select: selectUniqueMovies,
    enabled,
    staleTime: 86400 * 1000,
    gcTime: BACK_NAVIGATION_GC_TIME
  })
  useEffect(() => {
    if (result.isError) errors('Ошибка загрузки фильмов по фильтрам')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isError])
  return result
}
