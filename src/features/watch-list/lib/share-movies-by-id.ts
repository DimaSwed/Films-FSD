import { replaceEqualDeep } from '@tanstack/react-query'

import { IMovie } from '@/shared/lib'

/**
 * Нужна, чтобы после удаления одного фильма не перерисовывались карточки всех остальных.
 *
 * При обновлении данных React Query старается оставить прежние объекты там, где ничего не изменилось,
 * но сравнивает элементы массива по порядковому номеру. Удалили первый фильм — все следующие сдвинулись,
 * и React Query счёл их новыми. Здесь фильмы сравниваются по `id`.
 *
 * Передаётся в `useQuery` как `structuralSharing`.
 */
export const shareMoviesById = (oldData: unknown, newData: unknown) => {
  const oldMovies = new Map(((oldData ?? []) as IMovie[]).map((movie) => [movie.id, movie]))

  return (newData as IMovie[]).map((movie) => replaceEqualDeep(oldMovies.get(movie.id), movie))
}
