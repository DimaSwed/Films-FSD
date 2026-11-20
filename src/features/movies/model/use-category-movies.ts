import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { getNextTmdbPage, selectUniqueMovies } from '@/shared/lib'
import { useNotification } from '@/shared/notifications'

import { moviesApi } from '../api'

import type { TMovieCategory } from './movies.types'

/** Подборка целиком с бесконечной прокруткой (страница «Просмотреть все»). `undefined` — запрос не делается. */
export const useCategoryMovies = (category: TMovieCategory | undefined) => {
  const { errors } = useNotification()
  const result = useInfiniteQuery({
    queryKey: ['movies-infinite', category],
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
