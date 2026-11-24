import type { InfiniteData } from '@tanstack/react-query'

import type { IMovie, IPaginatedResponse } from './common.types'

/** TMDB не отдаёт страницы дальше 500 (ошибка 400), даже если `total_pages` больше. */
export const TMDB_MAX_PAGE = 500

/** `getNextPageParam` для `useInfiniteQuery` над страничными ответами TMDB. */
export const getNextTmdbPage = (lastPage: IPaginatedResponse<unknown>): number | undefined =>
  lastPage.page < Math.min(lastPage.total_pages, TMDB_MAX_PAGE) ? lastPage.page + 1 : undefined

/** Убирает повторы по `id`, сохраняя порядок первых вхождений. */
export const uniqueMovies = (movies: IMovie[]): IMovie[] => [
  ...new Map(movies.map((movie) => [movie.id, movie])).values()
]

/**
 * `select` для `useInfiniteQuery`: склеивает страницы в один список без повторов.
 * Пока пользователь листает, выдача TMDB может измениться, и один фильм попадёт на две страницы.
 */
export const selectUniqueMovies = (data: InfiniteData<IPaginatedResponse<IMovie>>): IMovie[] =>
  uniqueMovies(data.pages.flatMap((page) => page.results))

/**
 * Загружает список целиком: сначала первую страницу (из неё узнаём число страниц), потом остальные
 * одновременно. Если список изменился посреди загрузки, один фильм может прийти дважды — повторы убираем.
 */
export const loadAllPages = async (
  fetchPage: (page: number) => Promise<IPaginatedResponse<IMovie>>
): Promise<IMovie[]> => {
  const first = await fetchPage(1)
  const pageCount = Math.min(first.total_pages, TMDB_MAX_PAGE)

  const rest = await Promise.all(
    Array.from({ length: Math.max(pageCount - 1, 0) }, (_, i) => fetchPage(i + 2))
  )

  return uniqueMovies([first, ...rest].flatMap((page) => page.results))
}
