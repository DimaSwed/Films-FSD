import { useQueryClient } from '@tanstack/react-query'

import { useSessionId, useUserDetails } from '@/entities/user/@x/movie'
import { IMovie } from '@/shared/lib'

import { getWatchlistKey } from './watchlist.keys'

/**
 * Обновляет список «К просмотру» на экране после того, как фильм добавили, убрали или оценили.
 *
 * Если в этот момент список как раз загружается, загрузку отменяем: её ответ мог быть собран до нашего
 * изменения и вернул бы, например, удалённый фильм. Список помечаем устаревшим — при следующем
 * открытии страницы он загрузится с сервера заново.
 */
export const useUpdateWatchlistCache = () => {
  const queryClient = useQueryClient()
  const sessionId = useSessionId()
  const { data: user } = useUserDetails()
  const queryKey = getWatchlistKey(sessionId, user?.id)

  return async (update: (movies: IMovie[]) => IMovie[]) => {
    await queryClient.cancelQueries({ queryKey })
    queryClient.setQueryData<IMovie[]>(queryKey, (old) => old && update(old))
    await queryClient.invalidateQueries({ queryKey, refetchType: 'none' })
  }
}
