import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useUpdateMovieAccountState, useUpdateWatchlistCache } from '@/entities/movie'
import { useSessionId, useUserDetails } from '@/entities/user'
import { updateAccountMovieList } from '@/shared/lib'
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
  const updateWatchlistCache = useUpdateWatchlistCache()
  const { success, errors } = useNotification()

  return useMutation({
    mutationFn: async ({ movieId, value }: IRateMovieVariables) => {
      if (!sessionId) throw new Error('Требуется авторизация')
      return rateMovieApi.rate(movieId, value, sessionId)
    },
    onSuccess: async (_, { movieId, value }) => {
      const ratedKey = getRatedMoviesKey(user?.id)

      // TMDB убирает оценённый фильм из «К просмотру», если пользователь не отключил это в настройках
      // TMDB. Показываем сразу, а списки только помечаем устаревшими: при следующем открытии
      // они сверятся с сервером.
      updateAccountState(movieId, { rated: { value }, watchlist: false })
      await updateWatchlistCache((movies) => movies.filter((movie) => movie.id !== movieId))

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
