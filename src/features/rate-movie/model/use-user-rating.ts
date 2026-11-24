import { useMovieAccountState } from '@/entities/movie'

/** Оценка, которую пользователь поставил фильму; `null` — фильм не оценён. */
export const useUserRating = (movieId: number) => {
  const { data, isLoading } = useMovieAccountState(movieId, ({ rated }) =>
    rated ? rated.value : null
  )

  return { userRating: data ?? null, isLoading }
}
