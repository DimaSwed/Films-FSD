import { useQuery } from '@tanstack/react-query'
import { useSessionId } from '@/features/auth'
import { watchListApi } from '@/features/watch-list/api'

export const useIsInWatchlist = (movieId: number) => {
  const sessionId = useSessionId()

  const { data, isLoading } = useQuery({
    queryKey: ['movie-watchlist-state', movieId, sessionId],
    queryFn: () => watchListApi.getWatchlistStatus(movieId, sessionId!),
    enabled: !!sessionId && !!movieId,
    staleTime: 1000 * 60 * 5
  })

  return {
    isInWatchlist: data?.watchlist ?? false,
    isLoading: !!sessionId && isLoading
  }
}
