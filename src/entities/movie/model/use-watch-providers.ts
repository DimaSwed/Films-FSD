import { useQuery } from '@tanstack/react-query'

import { movieApi } from '../api'
import { transformWatchProviders } from '../lib'

export const useWatchProviders = (id: number) => {
  return useQuery({
    queryKey: ['watch-providers', id],
    queryFn: async () => {
      const { data } = await movieApi.getWatchProviders(id)
      return transformWatchProviders(data)
    },
    enabled: !!id,
    staleTime: 86400 * 1000
  })
}
