import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { useNotification } from '@/shared/notifications'

import { REMOVE_FROM_WATCH_LIST_KEY, useRemoveFromWatchList } from './use-remove-from-watch-list'
import { useRestoreToWatchlist } from './use-restore-to-watch-list'

/** Убирает фильм из списка и показывает уведомление с кнопкой «Отменить». */
export const useRemoveFromWatchListWithUndo = () => {
  const queryClient = useQueryClient()
  const { mutate: restore } = useRestoreToWatchlist()
  const { successWithAction } = useNotification()

  const { mutate: remove } = useRemoveFromWatchList({
    onRemoved: (movie) =>
      successWithAction(`Убрано из списка: «${movie.title}»`, {
        key: `watchlist-removed-${movie.id}`,
        label: 'Отменить',
        onAction: () => restore(movie)
      })
  })

  return useCallback(
    (movieId: number) => {
      // Пока сервер не ответил, карточка остаётся на экране и крестик можно нажать ещё раз.
      // Второй такой же запрос не отправляем.
      const isRemoving = queryClient.isMutating({
        mutationKey: REMOVE_FROM_WATCH_LIST_KEY,
        predicate: ({ state }) => state.variables === movieId
      })

      if (!isRemoving) remove(movieId)
    },
    [queryClient, remove]
  )
}
