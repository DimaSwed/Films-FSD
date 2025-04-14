// src/features/movies/hooks/use-trailers.ts
import { useQuery } from '@tanstack/react-query'
import { trailerApi } from '@/features/movies/api/trailer-api'
import { ITrailer } from '@/features/movies/types/movies.types'

export const useMovieTrailers = (movieIds: number[]) => {
  return useQuery({
    queryKey: ['trailers', ...movieIds],
    queryFn: async () => {
      const promises = movieIds.map((id) =>
        trailerApi.getTrailers(id).then((res) => ({
          id,
          trailers: res.data.results.filter((video: ITrailer) => video.type === 'Trailer')
        }))
      )
      const results = await Promise.all(promises)
      return results.reduce(
        (acc, { id, trailers }) => {
          acc[id] = trailers
          return acc
        },
        {} as Record<number, ITrailer[]>
      )
    },
    enabled: movieIds.length > 0,
    staleTime: 86400 * 1000 // 24 часа
  })
}
