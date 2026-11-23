import type { TFavoritesOrder } from './favorites.types'

/** Общая часть ключа всех списков избранного пользователя: по ней сбрасываем и правим кэш. */
export const getFavoritesKey = (userId: number | undefined) => ['favorites', userId] as const

/** Ключ постраничного списка избранного с конкретным порядком (`sort_by` у TMDB). */
export const getFavoritesListKey = (userId: number | undefined, order: TFavoritesOrder) =>
  [...getFavoritesKey(userId), order] as const

/** Ключ списка избранного, загруженного целиком (для поиска и сортировки на клиенте). */
export const getFavoritesAllKey = (userId: number | undefined, order: TFavoritesOrder) =>
  [...getFavoritesKey(userId), 'all', order] as const

/** Относится ли запрос к списку, загруженному целиком (у него данные — массив, а не страницы). */
export const isFavoritesAllQuery = (queryKey: readonly unknown[]) => queryKey[2] === 'all'
