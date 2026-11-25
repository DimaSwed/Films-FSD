import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  getWatchlistKey,
  useUpdateMovieAccountState,
  useUpdateWatchlistCache
} from '@/entities/movie'
import { useSessionId, useUserDetails } from '@/entities/user'
import { IMovie } from '@/shared/lib'
import { useNotification } from '@/shared/notifications'

import { watchListApi } from '../api'

export const REMOVE_FROM_WATCH_LIST_KEY = ['remove-from-watch-list']

interface IRemoveFromWatchListOptions {
  /**
   * Что сделать после удаления вместо обычного уведомления. Сработает, только если список был
   * загружен: иначе данных фильма у нас нет и передать нечего.
   */
  onRemoved?: (movie: IMovie) => void
}

export const useRemoveFromWatchList = ({ onRemoved }: IRemoveFromWatchListOptions = {}) => {
  const queryClient = useQueryClient()
  const sessionId = useSessionId()
  const { data: user } = useUserDetails()
  const updateAccountState = useUpdateMovieAccountState()
  const updateWatchlistCache = useUpdateWatchlistCache()
  const { success, errors } = useNotification()

  return useMutation({
    mutationKey: REMOVE_FROM_WATCH_LIST_KEY,
    mutationFn: async (movieId: number) => {
      if (!sessionId || !user?.id) {
        throw new Error('Невозможно удалить из списка: требуется авторизация')
      }

      return watchListApi.removeMovieFromWatchlist(movieId, sessionId, user.id)
    },
    onSuccess: async (_, movieId) => {
      const removed = queryClient
        .getQueryData<IMovie[]>(getWatchlistKey(sessionId, user?.id))
        ?.find((movie) => movie.id === movieId)

      updateAccountState(movieId, { watchlist: false })
      await updateWatchlistCache((movies) => movies.filter((movie) => movie.id !== movieId))

      if (onRemoved && removed) onRemoved(removed)
      else success('Фильм успешно удален из списка!')
    },
    onError: () => {
      errors('Ошибка при удалении фильма из списка')
    }
  })
}
