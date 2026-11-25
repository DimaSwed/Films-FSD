import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useUpdateMovieAccountState } from '@/entities/movie'
import { useSessionId, useUserDetails } from '@/entities/user'
import { updateAccountMovieList } from '@/shared/lib'
import { useNotification } from '@/shared/notifications'

import { favoritesApi } from '../api'

import { getFavoritesKey } from './favorites.keys'

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient()
  const sessionId = useSessionId()
  const { data: userDetails } = useUserDetails()
  const updateAccountState = useUpdateMovieAccountState()
  const { success, errors } = useNotification()

  return useMutation({
    mutationFn: (movieId: number) => {
      if (!sessionId || !userDetails?.id) {
        throw new Error('Требуется авторизация')
      }
      return favoritesApi.removeFromFavorites(movieId, sessionId, userDetails.id)
    },
    onSuccess: async (_, movieId) => {
      updateAccountState(movieId, { favorite: false })
      // Сразу убираем фильм из списка, а потом перезапрашиваем данные, чтобы они совпали с сервером
      await updateAccountMovieList(queryClient, getFavoritesKey(userDetails?.id), {
        update: (movies) => movies.filter((movie) => movie.id !== movieId)
      })
      success('Фильм удалён из избранного')
    },
    onError: () => {
      errors('Ошибка при удалении из избранного')
    }
  })
}
