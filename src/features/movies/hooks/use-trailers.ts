import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { trailerApi } from '@/features/movies'
import { ITrailer } from '@/features/movies'
import { useNotification } from '@/shared/notifications'

export const useMovieTrailers = (movieIds: number[]) => {
  const { errors } = useNotification()
  const result = useQuery({
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
    staleTime: 86400 * 1000
  })
  useEffect(() => {
    if (result.isError) errors('Ошибка загрузки трейлеров')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isError])
  return result
}
