import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { favoritesApi } from '../api'
import { useSessionId, useUserDetails } from '@/entities/user'
import { useMovieAccountState, useUpdateMovieAccountState } from '@/entities/movie'
import { IFavoritesResponse } from './favorites.types'
import { IMovie } from '@/shared/lib'
import { useNotification } from '@/shared/notifications'

/** Список избранного с серверной пагинацией TMDB (по странице за запрос). */
export const useFavoritesList = () => {
  const sessionId = useSessionId()
  const { data: userDetails } = useUserDetails()
  const userId = userDetails?.id

  return useInfiniteQuery({
    queryKey: ['favorites', userId],
    queryFn: ({ pageParam }) => {
      if (!sessionId || !userId) {
        throw new Error('Authentication required')
      }
      return favoritesApi.getFavorites(sessionId, userId, pageParam)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    // Страницы TMDB сдвигаются, если список изменился во время скролла — убираем дубли.
    select: (data): IMovie[] => [
      ...new Map(
        data.pages.flatMap((page) => page.results).map((movie) => [movie.id, movie])
      ).values()
    ],
    enabled: !!sessionId && !!userId,
    staleTime: 1000 * 60 * 5,
    retry: 2
  })
}

/** Находится ли фильм в избранном — точечный запрос, не зависит от загрузки списка. */
export const useIsFavorite = (movieId: number) => {
  const { data, isLoading, isError } = useMovieAccountState(movieId, (state) => state.favorite)

  return { isFavorite: data ?? false, isLoading, isError }
}

export const useAddToFavorites = () => {
  const queryClient = useQueryClient()
  const sessionId = useSessionId()
  const { data: userDetails } = useUserDetails()
  const updateAccountState = useUpdateMovieAccountState()
  const { success, errors } = useNotification()

  return useMutation({
    mutationFn: (movieId: number) => {
      if (!sessionId || !userDetails?.id) {
        throw new Error('Authentication required')
      }
      return favoritesApi.addToFavorites(movieId, sessionId, userDetails.id)
    },
    onSuccess: (_, movieId) => {
      updateAccountState(movieId, { favorite: true })
      queryClient.invalidateQueries({ queryKey: ['favorites', userDetails?.id] })
      success('Фильм добавлен в избранное!')
    },
    onError: () => {
      errors('Ошибка при добавлении в избранное')
    }
  })
}

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient()
  const sessionId = useSessionId()
  const { data: userDetails } = useUserDetails()
  const updateAccountState = useUpdateMovieAccountState()
  const { success, errors } = useNotification()

  return useMutation({
    mutationFn: (movieId: number) => {
      if (!sessionId || !userDetails?.id) {
        throw new Error('Authentication required')
      }
      return favoritesApi.removeFromFavorites(movieId, sessionId, userDetails.id)
    },
    onSuccess: (_, movieId) => {
      const queryKey = ['favorites', userDetails?.id]

      updateAccountState(movieId, { favorite: false })
      // Мгновенно убираем фильм из UI, затем invalidate выравнивает границы страниц с сервером.
      queryClient.setQueryData<InfiniteData<IFavoritesResponse>>(
        queryKey,
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
