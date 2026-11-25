import { useQueryClient } from '@tanstack/react-query'

import { useSessionId, useUserDetails } from '@/entities/user/@x/movie'
import { IMovie } from '@/shared/lib'

import { getWatchlistKey } from './watchlist.keys'

/**
 * Обновляет список «К просмотру» на экране после того, как фильм добавили, убрали или оценили.
 *
 * Если в этот момент список как раз загружается, загрузку отменяем: её ответ мог быть собран до нашего
 * изменения и вернул бы, например, удалённый фильм.
 *
 * Загруженный список правим через `update` и помечаем устаревшим — при следующем открытии страницы он
 * сверится с сервером. Если править нечего (список ещё не загружен) или нечем (`update` не передан),
 * а страница списка открыта, загружаем его заново.
 */
export const useUpdateWatchlistCache = () => {
  const queryClient = useQueryClient()
  const sessionId = useSessionId()
  const { data: user } = useUserDetails()
  const queryKey = getWatchlistKey(sessionId, user?.id)

  return async (update?: (movies: IMovie[]) => IMovie[]) => {
    await queryClient.cancelQueries({ queryKey })

    const movies = queryClient.getQueryData<IMovie[]>(queryKey)
    const isPatched = !!movies && !!update
    if (isPatched) queryClient.setQueryData<IMovie[]>(queryKey, update(movies))

    // Загрузку не ждём: иначе кнопка и уведомление зависели бы от неё
    void queryClient.invalidateQueries({ queryKey, refetchType: isPatched ? 'none' : 'active' })
  }
}
