import { useMutation, useQueryClient } from '@tanstack/react-query'

import { getWatchlistKey, useUpdateMovieAccountState } from '@/entities/movie'
import { useSessionId, useUserDetails } from '@/entities/user'
import { IMovie, updateAccountMovieList } from '@/shared/lib'
import { useNotification } from '@/shared/notifications'

import { rateMovieApi } from '../api'
import { formatUserRating } from '../lib'

import { getRatedMoviesKey } from './rated-movies.keys'

interface IRateMovieVariables {
  movieId: number
  value: number
}

/** Оценить фильм, то есть отметить его просмотренным. */
export const useRateMovie = () => {
  const queryClient = useQueryClient()
  const sessionId = useSessionId()
  const { data: user } = useUserDetails()
  const updateAccountState = useUpdateMovieAccountState()
  const { success, errors } = useNotification()

  return useMutation({
    mutationFn: async ({ movieId, value }: IRateMovieVariables) => {
      if (!sessionId) throw new Error('Требуется авторизация')
      return rateMovieApi.rate(movieId, value, sessionId)
    },
    onSuccess: (_, { movieId, value }) => {
      const watchlistKey = getWatchlistKey(sessionId, user?.id)
      const ratedKey = getRatedMoviesKey(user?.id)

      // TMDB убирает оценённый фильм из «К просмотру», если пользователь не отключил это в настройках
      // TMDB. Показываем сразу, а списки только помечаем устаревшими: при следующем открытии
      // они сверятся с сервером.
      updateAccountState(movieId, { rated: { value }, watchlist: false })
      queryClient.setQueryData<IMovie[]>(watchlistKey, (old) =>
        old?.filter((movie) => movie.id !== movieId)
      )
      queryClient.invalidateQueries({ queryKey: watchlistKey, refetchType: 'none' })

      updateAccountMovieList(queryClient, ratedKey, (movies) =>
        movies.map((movie) => (movie.id === movieId ? { ...movie, userRating: value } : movie))
      )
      queryClient.invalidateQueries({ queryKey: ratedKey, refetchType: 'none' })

      success(`Фильм в «Просмотрено», ваша оценка — ${formatUserRating(value)}`)
    },
    onError: () => {
      errors('Не удалось сохранить оценку')
    }
  })
}
