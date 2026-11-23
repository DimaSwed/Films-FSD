import { useQueries } from '@tanstack/react-query'

import { movieTrailerOptions } from '@/entities/movie'

import type { TMovieCategory, TTrailerItem } from './movies.types'
import { useCategoryMovies } from './use-category-movies'

/**
 * Трейлеры подборки с бесконечной прокруткой. Ролики — по запросу на фильм (батча у TMDB нет), каждый
 * сам по себе: готовые карточки не ждут остальных, а сбой одного ролика не теряет его фильм.
 */
export const useCategoryTrailers = (category: TMovieCategory) => {
  const list = useCategoryMovies(category, { cacheKey: 'trailers-infinite' })
  const movies = list.data ?? []
  const trailers = useQueries({ queries: movies.map(({ id }) => movieTrailerOptions(id)) })

  const items = movies.flatMap((movie, index): TTrailerItem[] => {
    const { status, data: trailer } = trailers[index]
    if (status !== 'success') return [{ status, movie }]
    return trailer ? [{ status: 'ready', movie, trailer }] : []
  })

  return {
    items,
    /** Сколько фильмов запрошено, включая отсеянные: по нему ограничивается автоподгрузка. */
    loadedCount: movies.length,
    isLoading: list.isLoading,
    isSuccess: list.isSuccess,
    isError: list.isError,
    hasNextPage: list.hasNextPage,
    isFetchingNextPage: list.isFetchingNextPage,
    fetchNextPage: list.fetchNextPage,
    refetch: list.refetch,
    /** Повторяет все упавшие ролики сразу: сбой обычно общий (сеть, лимит TMDB). */
    retryFailed: () => trailers.forEach(({ isError, refetch }) => isError && refetch())
  }
}
