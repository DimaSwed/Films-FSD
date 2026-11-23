import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { getNextTmdbPage, selectUniqueMovies } from '@/shared/lib'
import { useNotification } from '@/shared/notifications'

import { moviesApi } from '../api'

import type { TMovieCategory } from './movies.types'

interface IUseCategoryMoviesOptions {
  /**
   * Список страниц под своим ключом. Трейлерам общий с «Просмотреть все» кэш не подходит: пролистанные
   * там 15 страниц сразу дали бы 300 запросов роликов.
   */
  cacheKey?: 'movies-infinite' | 'trailers-infinite'
}

/** Подборка целиком с бесконечной прокруткой. `undefined` — запрос не делается. */
export const useCategoryMovies = (
  category: TMovieCategory | undefined,
  { cacheKey = 'movies-infinite' }: IUseCategoryMoviesOptions = {}
) => {
  const { errors } = useNotification()
  const result = useInfiniteQuery({
    queryKey: [cacheKey, category],
    queryFn: ({ pageParam }) => moviesApi.getCategoryPage(category!, pageParam),
    initialPageParam: 1,
    getNextPageParam: getNextTmdbPage,
    select: selectUniqueMovies,
    enabled: !!category,
    staleTime: 86400 * 1000
  })
  useEffect(() => {
    if (result.isError) errors('Ошибка загрузки фильмов')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isError])
  return result
}
