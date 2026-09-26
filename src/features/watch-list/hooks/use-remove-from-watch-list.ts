import { useMutation, useQueryClient } from '@tanstack/react-query'
import { watchListApi } from '@/features/watch-list'
import { useSessionId, useUserDetails } from '@/entities/user'
import { useUpdateMovieAccountState } from '@/features/movie'
import { useNotification } from '@/shared/notifications'
import { IMovie } from '@/shared/types'

export const useRemoveFromWatchList = () => {
  const queryClient = useQueryClient()
  const sessionId = useSessionId()
  const { data: user } = useUserDetails()
  const updateAccountState = useUpdateMovieAccountState()
  const { success, errors } = useNotification()

  return useMutation({
    mutationFn: async (movieId: number) => {
      if (!sessionId || !user?.id) {
        throw new Error('Невозможно удалить из списка: требуется авторизация')
      }

      return watchListApi.removeMovieFromWatchlist(movieId, sessionId, user.id)
    },
    onSuccess: (_, movieId) => {
      updateAccountState(movieId, { watchlist: false })
      queryClient.setQueryData<IMovie[]>(['watchlist-all', sessionId, user?.id], (old) =>
        old?.filter((movie) => movie.id !== movieId)
      )
      success('Фильм успешно удален из списка!')
    },
    onError: () => {
      errors('Ошибка при удалении фильма из списка')
    }
  })
}
