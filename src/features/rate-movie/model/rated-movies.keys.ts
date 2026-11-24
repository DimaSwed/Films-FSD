/** Общая часть ключа всех видов списка «Просмотрено»: по ней сбрасываем и правим кэш. */
export const getRatedMoviesKey = (userId: number | undefined) => ['rated-movies', userId] as const
