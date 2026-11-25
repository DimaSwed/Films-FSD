import { useMutation } from '@tanstack/react-query'

import { useUpdateMovieAccountState, useUpdateWatchlistCache } from '@/entities/movie'
import { useSessionId, useUserDetails } from '@/entities/user'
import { IMovie } from '@/shared/lib'
import { useNotification } from '@/shared/notifications'

import { watchListApi } from '../api'

/**
 * Возвращает фильм, который только что убрали. Отмены удаления в TMDB нет, поэтому фильм добавляется
 * заново и в сортировке по дате добавления становится самым новым.
 */
export const useRestoreToWatchlist = () => {
  const sessionId = useSessionId()
  const { data: user } = useUserDetails()
  const updateAccountState = useUpdateMovieAccountState()
  const updateWatchlistCache = useUpdateWatchlistCache()
  const { success, errors } = useNotification()

  return useMutation({
    mutationFn: async (movie: IMovie) => {
      if (!sessionId || !user?.id) {
        throw new Error('Невозможно вернуть в список: требуется авторизация')
      }

      return watchListApi.addToWatchlist(movie.id, sessionId, user.id)
    },
    onSuccess: async (_, movie) => {
      updateAccountState(movie.id, { watchlist: true })
      // TMDB отдаёт список от давно добавленных к недавним, поэтому вернувшийся фильм ставим в конец
      await updateWatchlistCache((movies) =>
        movies.some(({ id }) => id === movie.id) ? movies : [...movies, movie]
      )
      success(`«${movie.title}» снова в списке`)
    },
    onError: () => {
      errors('Не удалось вернуть фильм в список')
    }
  })
}
