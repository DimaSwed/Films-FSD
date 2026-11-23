import { useMovieAccountState } from '@/entities/movie'

/** Лежит ли фильм в избранном. Спрашиваем у TMDB про один фильм, список целиком не нужен. */
export const useIsFavorite = (movieId: number) => {
  const { data, isLoading, isError } = useMovieAccountState(movieId, (state) => state.favorite)

  return { isFavorite: data ?? false, isLoading, isError }
}
