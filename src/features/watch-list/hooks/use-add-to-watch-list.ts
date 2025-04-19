import { useMutation, useQueryClient } from '@tanstack/react-query'
import { watchListApi } from '@/features/watch-list/'
import { useSessionId } from '@/features/auth'
import { useUserDetails } from '@/features/user'
import { useNotification } from '@/shared/notifications'

export const useAddToWatchlist = () => {
  const queryClient = useQueryClient()
  const sessionId = useSessionId()!
  const { data: user } = useUserDetails()
  const { success, errors } = useNotification()

  return useMutation({
    mutationFn: async (movieId: number) => {
      if (!user || !user.id) {
        throw new Error('Невозможно добавить в список: не получен ID пользователя')
      }

      return watchListApi.addToWatchlist(movieId, sessionId, user.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['watchlist-all', sessionId, user?.id]
      })
      queryClient.invalidateQueries({ queryKey: ['movies'] })
      success('Фильм успешно добавлен в список!')
    },
    onError: (error) => {
      console.error('Ошибка при добавлении в список:', error)
      errors('Ошибка при добавлении фильма в список')
    }
  })
}
