import { useMutation } from '@tanstack/react-query'

import { useUpdateMovieAccountState, useUpdateWatchlistCache } from '@/entities/movie'
import { useSessionId, useUserDetails } from '@/entities/user'
import { useNotification } from '@/shared/notifications'

import { watchListApi } from '../api'

export const useAddToWatchlist = () => {
  const sessionId = useSessionId()
  const { data: user } = useUserDetails()
  const updateAccountState = useUpdateMovieAccountState()
  const updateWatchlistCache = useUpdateWatchlistCache()
  const { success, errors } = useNotification()

  return useMutation({
    mutationFn: async (movieId: number) => {
      if (!sessionId || !user?.id) {
        throw new Error('Невозможно добавить в список: требуется авторизация')
      }

      return watchListApi.addToWatchlist(movieId, sessionId, user.id)
    },
    onSuccess: async (_, movieId) => {
      updateAccountState(movieId, { watchlist: true })
      // Данных фильма здесь нет, только номер: дописать его в список нечем
      await updateWatchlistCache()
      success('Фильм успешно добавлен в список!')
    },
    onError: () => {
      errors('Ошибка при добавлении фильма в список')
    }
  })
}
