import { useMutation, useQueryClient } from '@tanstack/react-query'
import { movieApi } from '@/features/movie/api/movie-api'
import { useSessionId } from '@/features/auth/hooks'
import { useUserDetails } from '@/features/user/hooks'

export const useAddToWatchlist = () => {
  const queryClient = useQueryClient()
  const sessionId = useSessionId()!
  const { data: user } = useUserDetails()

  return useMutation({
    mutationFn: async (movieId: number) => {
      if (!user || !user.id) {
        throw new Error('Невозможно добавить в список: не получен ID пользователя')
      }

      return movieApi.addToWatchlist(movieId, sessionId, user.id)
    },
    onSuccess: () => {
      // Инвалидируем все связанные запросы
      queryClient.invalidateQueries({ queryKey: ['watchlist'] })
      queryClient.invalidateQueries({ queryKey: ['movies'] })
    },
    onError: (error) => {
      console.error('Ошибка при добавлении в список:', error)
    }
  })
}
