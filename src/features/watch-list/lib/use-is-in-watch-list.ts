import { useMovieAccountState } from '@/entities/movie'
import { useSessionId } from '@/entities/user'

export const useIsInWatchlist = (movieId: number) => {
  const sessionId = useSessionId()
  const { data, isLoading } = useMovieAccountState(movieId, (state) => state.watchlist)

  return {
    isInWatchlist: data ?? false,
    isLoading: !!sessionId && isLoading
  }
}
