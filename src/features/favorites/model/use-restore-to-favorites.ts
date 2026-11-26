import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useUpdateMovieAccountState } from '@/entities/movie'
import { useSessionId, useUserDetails } from '@/entities/user'
import { IMovie, updateAccountMovieList } from '@/shared/lib'
import { useNotification } from '@/shared/notifications'

import { favoritesApi } from '../api'

import { getFavoritesKey } from './favorites.keys'

/**
 * Возвращает фильм, который только что убрали из избранного. Отмены удаления в TMDB нет, поэтому
 * фильм добавляется заново и в сортировке по дате добавления становится самым новым.
 */
export const useRestoreToFavorites = () => {
  const queryClient = useQueryClient()
  const sessionId = useSessionId()
  const { data: userDetails } = useUserDetails()
  const updateAccountState = useUpdateMovieAccountState()
  const { success, errors } = useNotification()

  return useMutation({
    mutationFn: (movie: IMovie) => {
      if (!sessionId || !userDetails?.id) {
        throw new Error('Требуется авторизация')
      }
      return favoritesApi.addToFavorites(movie.id, sessionId, userDetails.id)
    },
    onSuccess: async (_, movie) => {
      updateAccountState(movie.id, { favorite: true })
      // Место фильма в списке зависит от сортировки — берём порядок с сервера
      await updateAccountMovieList(queryClient, getFavoritesKey(userDetails?.id))
      success(`«${movie.title}» снова в избранном`)
    },
    onError: () => {
      errors('Не удалось вернуть фильм в избранное')
    }
  })
}
