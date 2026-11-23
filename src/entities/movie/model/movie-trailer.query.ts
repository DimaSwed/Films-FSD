import { queryOptions } from '@tanstack/react-query'

import { movieApi } from '../api'
import { pickMovieTrailer } from '../lib'

/** Трейлер фильма (`null` — ролика нет). Опции общие для `useQuery` и `useQueries` — кэш один на все списки. */
export const movieTrailerOptions = (movieId: number) =>
  queryOptions({
    queryKey: ['movie-trailer', movieId],
    queryFn: async () => {
      const { data } = await movieApi.getVideos(movieId)
      return pickMovieTrailer(data.results)
    },
    // Быстрый сбой повторяем один раз; после таймаута повтор только удвоил бы ожидание
    retry: (failureCount, error) => failureCount < 1 && error.code !== 'ECONNABORTED',
    staleTime: 86400 * 1000
  })
