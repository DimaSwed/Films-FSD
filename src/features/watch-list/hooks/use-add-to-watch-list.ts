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
    onSuccess: (_, movieId) => {
      queryClient.setQueryData(
        ['movie-watchlist-state', movieId, sessionId],
        (old: { id: number; watchlist: boolean; favorite: boolean } | undefined) => ({
          ...old,
          watchlist: true
        })
      )
      queryClient.invalidateQueries({ queryKey: ['watchlist-all', sessionId, user?.id] })
      success('Фильм успешно добавлен в список!')
    },
    onError: (error) => {
      console.error('Ошибка при добавлении в список:', error)
      errors('Ошибка при добавлении фильма в список')
    }
  })
}
