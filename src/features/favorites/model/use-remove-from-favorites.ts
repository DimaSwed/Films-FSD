import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useUpdateMovieAccountState } from '@/entities/movie'
import { useSessionId, useUserDetails } from '@/entities/user'
import { updateAccountMovieList } from '@/shared/lib'
import { useNotification } from '@/shared/notifications'

import { favoritesApi } from '../api'

import { getFavoritesKey } from './favorites.keys'

export const REMOVE_FROM_FAVORITES_KEY = ['remove-from-favorites']

interface IRemoveFromFavoritesOptions {
  /** Что сделать после удаления вместо обычного уведомления. */
  onRemoved?: (movieId: number) => void
  /** Удалить не получилось (уведомление об ошибке показывается в любом случае). */
  onFailed?: (movieId: number) => void
}

export const useRemoveFromFavorites = ({
  onRemoved,
  onFailed
}: IRemoveFromFavoritesOptions = {}) => {
  const queryClient = useQueryClient()
  const sessionId = useSessionId()
  const { data: userDetails } = useUserDetails()
  const updateAccountState = useUpdateMovieAccountState()
  const { success, errors } = useNotification()

  return useMutation({
    mutationKey: REMOVE_FROM_FAVORITES_KEY,
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
      if (onRemoved) onRemoved(movieId)
      else success('Фильм удалён из избранного')
    },
    onError: (_, movieId) => {
      onFailed?.(movieId)
      errors('Ошибка при удалении из избранного')
    }
  })
}
