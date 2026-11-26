import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useRef } from 'react'

import { IMovie } from '@/shared/lib'
import { useNotification } from '@/shared/notifications'

import { REMOVE_FROM_FAVORITES_KEY, useRemoveFromFavorites } from './use-remove-from-favorites'
import { useRestoreToFavorites } from './use-restore-to-favorites'

/**
 * Убирает фильм из избранного и показывает уведомление с кнопкой «Отменить».
 * Вызывать на уровне страницы: карточка исчезает раньше, чем приходит время показать уведомление.
 */
export const useRemoveFromFavoritesWithUndo = () => {
  const queryClient = useQueryClient()
  const { mutate: restore } = useRestoreToFavorites()
  const { success, successWithAction } = useNotification()
  // Данные фильма для текста уведомления и возврата: сам запрос на удаление знает только id.
  // Запись живёт, пока идёт запрос, и удаляется при любом его исходе.
  const pending = useRef(new Map<number, IMovie>())

  const { mutate: remove } = useRemoveFromFavorites({
    onRemoved: (movieId) => {
      const movie = pending.current.get(movieId)
      pending.current.delete(movieId)

      if (!movie) {
        success('Фильм удалён из избранного')
        return
      }

      successWithAction(`Убрано из избранного: «${movie.title}»`, {
        key: `favorite-removed-${movie.id}`,
        label: 'Отменить',
        onAction: () => restore(movie)
      })
    },
    onFailed: (movieId) => pending.current.delete(movieId)
  })

  return useCallback(
    (movie: IMovie) => {
      // Пока сервер не ответил, карточка остаётся на экране; второй такой же запрос не отправляем
      const isRemoving = queryClient.isMutating({
        mutationKey: REMOVE_FROM_FAVORITES_KEY,
        predicate: ({ state }) => state.variables === movie.id
      })
      if (isRemoving) return

      pending.current.set(movie.id, movie)
      remove(movie.id)
    },
    [queryClient, remove]
  )
}
