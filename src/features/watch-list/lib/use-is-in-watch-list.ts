import { useSessionId } from '@/entities/user'
import { useMovieAccountState } from '@/features/movie'

export const useIsInWatchlist = (movieId: number) => {
  const sessionId = useSessionId()
  const { data, isLoading } = useMovieAccountState(movieId, (state) => state.watchlist)

  return {
    isInWatchlist: data ?? false,
    isLoading: !!sessionId && isLoading
  }
}
