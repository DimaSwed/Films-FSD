import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useUpdateMovieAccountState } from '@/entities/movie'
import { useSessionId, useUserDetails } from '@/entities/user'
import { updateAccountMovieList } from '@/shared/lib'
import { useNotification } from '@/shared/notifications'

import { rateMovieApi } from '../api'

import { getRatedMoviesKey } from './rated-movies.keys'

/** Убрать оценку, а с ней и фильм из «Просмотрено». */
export const useRemoveRating = () => {
  const queryClient = useQueryClient()
  const sessionId = useSessionId()
  const { data: user } = useUserDetails()
  const updateAccountState = useUpdateMovieAccountState()
  const { success, errors } = useNotification()

  return useMutation({
    mutationFn: async (movieId: number) => {
      if (!sessionId) throw new Error('Требуется авторизация')
      return rateMovieApi.removeRating(movieId, sessionId)
    },
    onSuccess: (_, movieId) => {
      const queryKey = getRatedMoviesKey(user?.id)

      updateAccountState(movieId, { rated: false })
      // Сразу убираем фильм из списка, а потом перезапрашиваем: страницы на сервере сдвинулись
      updateAccountMovieList(queryClient, queryKey, (movies) =>
        movies.filter((movie) => movie.id !== movieId)
      )
      queryClient.invalidateQueries({ queryKey })
      success('Оценка удалена, фильм убран из «Просмотрено»')
    },
    onError: () => {
      errors('Не удалось удалить оценку')
    }
  })
}
