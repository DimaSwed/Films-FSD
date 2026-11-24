import type { InfiniteData, QueryClient, QueryKey } from '@tanstack/react-query'

import type { IMovie, IPaginatedResponse } from './common.types'

/** Порядок списка аккаунта у TMDB — по дате добавления. */
export type TAddedOrder = 'created_at.asc' | 'created_at.desc'

/** Ключ постраничного списка. Общая часть (`baseKey`) — своя у каждого списка. */
export const getPagedListKey = (baseKey: QueryKey, order: TAddedOrder) =>
  [...baseKey, 'paged', order] as const

/** Ключ того же списка, загруженного целиком (для поиска и сортировки на клиенте). */
export const getFullListKey = (baseKey: QueryKey, order: TAddedOrder) =>
  [...baseKey, 'all', order] as const

type TListData = IMovie[] | InfiniteData<IPaginatedResponse<IMovie>>

/**
 * Правит фильмы во всех кэшированных видах списка аккаунта: и в постраничном, и в загруженном
 * целиком (массив).
 */
export const updateAccountMovieList = (
  queryClient: QueryClient,
  baseKey: QueryKey,
  update: (movies: IMovie[]) => IMovie[]
) => {
  queryClient.setQueriesData<TListData>({ queryKey: baseKey }, (old) => {
    if (!old || Array.isArray(old)) return old && update(old)

    return {
      ...old,
      pages: old.pages.map((page) => ({ ...page, results: update(page.results) }))
    }
  })
}
