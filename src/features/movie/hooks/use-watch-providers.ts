import { useQuery } from '@tanstack/react-query'
import { movieApi } from '../api/movie-api'

export const useWatchProviders = (id: number) => {
  return useQuery({
    queryKey: ['watch-providers', id],
    queryFn: async () => {
      const { data } = await movieApi.getWatchProviders(id)
      return data.results?.RU?.flatrate || []
    },
    enabled: !!id,
    staleTime: 86400 * 1000
  })
}
