import { useMutation, useQueryClient } from '@tanstack/react-query'
import { watchListApi } from '@/features/watch-list'
import { useSessionId } from '@/features/auth'
import { useUserDetails } from '@/features/user'
import { useNotification } from '@/shared/notifications'
// import { useSnackbar } from 'notistack'

export const useRemoveFromWatchList = () => {
  const queryClient = useQueryClient()
  const sessionId = useSessionId()!
  const { data: user } = useUserDetails()
  const { success, errors } = useNotification()

  return useMutation({
    mutationFn: async (movieId: number) => {
      if (!user || !user.id) {
        throw new Error('Невозможно удалить из списка: не получен ID пользователя')
      }

      return watchListApi.removeMovieFromWatchlist(movieId, sessionId, user.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist'] })
      queryClient.invalidateQueries({ queryKey: ['movies'] })
      success('Фильм успешно удален из списка!')
    },
    onError: (error) => {
      console.error('Ошибка при удалении из списка:', error)
      errors('Ошибка при удалении фильма из списка')
    }
  })
}
