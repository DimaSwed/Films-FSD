import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSessionId } from '@/features/auth'
import { IAccountState, movieApi } from '@/features/movie'

export const getMovieAccountStateKey = (movieId: number, sessionId: string | null | undefined) =>
  ['movie-account-state', movieId, sessionId] as const

/** Состояние фильма в аккаунте (избранное / к просмотру) — один запрос на фильм. */
export const useMovieAccountState = <T = IAccountState>(
  movieId: number,
  select?: (state: IAccountState) => T
) => {
  const sessionId = useSessionId()

  return useQuery({
    queryKey: getMovieAccountStateKey(movieId, sessionId),
    queryFn: () => movieApi.getAccountStates(movieId, sessionId!),
    enabled: !!sessionId && !!movieId,
    staleTime: 1000 * 60 * 5,
    select
  })
}

/** Точечно обновляет флаги в кэше; без записи в кэше — помечает запрос устаревшим. */
export const useUpdateMovieAccountState = () => {
  const queryClient = useQueryClient()
  const sessionId = useSessionId()

  return (movieId: number, patch: Partial<Pick<IAccountState, 'favorite' | 'watchlist'>>) => {
    const queryKey = getMovieAccountStateKey(movieId, sessionId)

    if (queryClient.getQueryData<IAccountState>(queryKey)) {
      queryClient.setQueryData<IAccountState>(queryKey, (old) => old && { ...old, ...patch })
    } else {
      queryClient.invalidateQueries({ queryKey })
    }
  }
}
