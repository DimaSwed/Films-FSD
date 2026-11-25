import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useUpdateMovieAccountState } from '@/entities/movie'
import { useSessionId, useUserDetails } from '@/entities/user'
import { updateAccountMovieList } from '@/shared/lib'
import { useNotification } from '@/shared/notifications'

import { favoritesApi } from '../api'

import { getFavoritesKey } from './favorites.keys'

export const useAddToFavorites = () => {
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
      return favoritesApi.addToFavorites(movieId, sessionId, userDetails.id)
    },
    onSuccess: async (_, movieId) => {
      updateAccountState(movieId, { favorite: true })
      await updateAccountMovieList(queryClient, getFavoritesKey(userDetails?.id))
      success('Фильм добавлен в избранное!')
    },
    onError: () => {
      errors('Ошибка при добавлении в избранное')
    }
  })
}
