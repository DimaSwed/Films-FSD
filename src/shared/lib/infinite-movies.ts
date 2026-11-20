import type { InfiniteData } from '@tanstack/react-query'

import type { IMovie, IPaginatedResponse } from './common.types'

/** TMDB не отдаёт страницы дальше 500 (ошибка 400), даже если `total_pages` больше. */
export const TMDB_MAX_PAGE = 500

/** `getNextPageParam` для `useInfiniteQuery` над страничными ответами TMDB. */
export const getNextTmdbPage = (lastPage: IPaginatedResponse<unknown>): number | undefined =>
  lastPage.page < Math.min(lastPage.total_pages, TMDB_MAX_PAGE) ? lastPage.page + 1 : undefined

/**
 * `select` для `useInfiniteQuery`: склеивает страницы в один список без дублей.
 * Выдача TMDB меняется во время скролла (страницы сдвигаются) — один фильм может прийти дважды.
 */
export const selectUniqueMovies = (data: InfiniteData<IPaginatedResponse<IMovie>>): IMovie[] => [
  ...new Map(data.pages.flatMap((page) => page.results).map((movie) => [movie.id, movie])).values()
]
