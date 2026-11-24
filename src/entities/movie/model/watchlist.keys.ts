/**
 * Ключ списка «К просмотру». Лежит в сущности, а не в фиче: список меняют и «К просмотру»,
 * и оценка фильма (TMDB убирает из него оценённые).
 */
export const getWatchlistKey = (sessionId: string | null | undefined, userId: number | undefined) =>
  ['watchlist-all', sessionId, userId] as const
