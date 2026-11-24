import { useSessionId, useUserDetails } from '@/entities/user'
import { useAccountMovieList } from '@/shared/lib'

import { rateMovieApi } from '../api'

import { getRatedMoviesKey } from './rated-movies.keys'

/** Список «Просмотрено»: фильмы, которым пользователь поставил оценку. */
export const useRatedMovies = () => {
  const sessionId = useSessionId()
  const { data: user } = useUserDetails()
  const userId = user?.id

  return useAccountMovieList({
    baseKey: getRatedMoviesKey(userId),
    enabled: !!sessionId && !!userId,
    fetchPage: (order, page) => rateMovieApi.getRatedMovies(sessionId!, userId!, order, page)
  })
}
