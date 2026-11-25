import { skipToken, useQuery } from '@tanstack/react-query'

import { isNotFoundError } from '@/shared/api'
import { BACK_NAVIGATION_GC_TIME } from '@/shared/config'

import { movieApi } from '../api'
import { transformWatchProviders } from '../lib'

export const useWatchProviders = (id: number | undefined) => {
  return useQuery({
    queryKey: ['watch-providers', id],
    queryFn:
      id === undefined
        ? skipToken
        : async () => {
            const { data } = await movieApi.getWatchProviders(id)
            return transformWatchProviders(data)
          },
    // Фильма нет в TMDB — повтор ничего не изменит
    retry: (failureCount, error) => failureCount < 1 && !isNotFoundError(error),
    staleTime: 86400 * 1000,
    // С иконками сервисов карточка «К просмотру» выше. Если они пропадут из кэша, список станет
    // короче, и при возврате «назад» откроется не то место.
    gcTime: BACK_NAVIGATION_GC_TIME
  })
}
