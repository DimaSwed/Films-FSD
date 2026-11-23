import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'

import { useUpdateMovieAccountState } from '@/entities/movie'
import { useSessionId, useUserDetails } from '@/entities/user'
import { IMovie } from '@/shared/lib'
import { useNotification } from '@/shared/notifications'

import { favoritesApi } from '../api'

import { getFavoritesKey, isFavoritesAllQuery } from './favorites.keys'
import type { IFavoritesResponse } from './favorites.types'

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient()
  const sessionId = useSessionId()
  const { data: userDetails } = useUserDetails()
  const updateAccountState = useUpdateMovieAccountState()
  const { success, errors } = useNotification()

  return useMutation({
    mutationFn: (movieId: number) => {
      if (!sessionId || !userDetails?.id) {
        throw new Error('Требуется авторизация')
      }
      return favoritesApi.removeFromFavorites(movieId, sessionId, userDetails.id)
    },
    onSuccess: (_, movieId) => {
      const queryKey = getFavoritesKey(userDetails?.id)

      updateAccountState(movieId, { favorite: false })
      // Сразу убираем фильм из списков, а потом перезапрашиваем данные, чтобы они совпали
      // с сервером. Списков два вида: постраничный и загруженный целиком — правим оба.
      queryClient.setQueriesData<IMovie[]>(
        { queryKey, predicate: (query) => isFavoritesAllQuery(query.queryKey) },
        (old) => old && old.filter((movie) => movie.id !== movieId)
      )
      queryClient.setQueriesData<InfiniteData<IFavoritesResponse>>(
        { queryKey, predicate: (query) => !isFavoritesAllQuery(query.queryKey) },
        (old) =>
          old && {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              results: page.results.filter((movie) => movie.id !== movieId),
              total_results: Math.max(page.total_results - 1, 0)
            }))
          }
      )
      queryClient.invalidateQueries({ queryKey })
      success('Фильм удалён из избранного')
    },
    onError: () => {
      errors('Ошибка при удалении из избранного')
    }
  })
}
