/** Общая часть ключа всех видов списка избранного: по ней сбрасываем и правим кэш. */
export const getFavoritesKey = (userId: number | undefined) => ['favorites', userId] as const
