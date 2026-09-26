import { useMutation, useQueryClient } from '@tanstack/react-query'
import { watchListApi } from '@/features/watch-list/'
import { useSessionId, useUserDetails } from '@/entities/user'
import { useUpdateMovieAccountState } from '@/entities/movie'
import { useNotification } from '@/shared/notifications'

export const useAddToWatchlist = () => {
  const queryClient = useQueryClient()
  const sessionId = useSessionId()
  const { data: user } = useUserDetails()
  const updateAccountState = useUpdateMovieAccountState()
  const { success, errors } = useNotification()

  return useMutation({
    mutationFn: async (movieId: number) => {
      if (!sessionId || !user?.id) {
        throw new Error('Невозможно добавить в список: требуется авторизация')
      }

      return watchListApi.addToWatchlist(movieId, sessionId, user.id)
    },
    onSuccess: (_, movieId) => {
      updateAccountState(movieId, { watchlist: true })
      queryClient.invalidateQueries({ queryKey: ['watchlist-all', sessionId, user?.id] })
      success('Фильм успешно добавлен в список!')
    },
    onError: () => {
      errors('Ошибка при добавлении фильма в список')
    }
  })
}
