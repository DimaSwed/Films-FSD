import { useMutation, useQuery, useQueryClient, useQueries } from '@tanstack/react-query'
import { favoritesApi } from '@/features/favorites'
import { useSessionId } from '@/features/auth'
import { useUserDetails } from '@/features/user'
import { IMovieDetails, movieApi, transformMovieDetails } from '@/features/movie'
import { IFavoriteMovie, IFavoritesResponse } from '@/features/favorites/types'
import { IMovie } from '@/shared/types'

export const useFavorites = () => {
  const sessionId = useSessionId()
  const { data: userDetails, isSuccess: isUserLoaded } = useUserDetails()

  return useQuery<IFavoritesResponse>({
    queryKey: ['favorites', userDetails?.id],
    queryFn: () => {
      if (!sessionId || !userDetails?.id) {
        throw new Error('Authentication required')
      }
      return favoritesApi.getFavorites(sessionId, userDetails.id)
    },
    enabled: !!sessionId && isUserLoaded && !!userDetails?.id,
    staleTime: 1000 * 60 * 5,
    retry: 2
  })
}
export const useAddToFavorites = () => {
  const queryClient = useQueryClient()
  const sessionId = useSessionId()
  const { data: userDetails } = useUserDetails()

  return useMutation({
    mutationFn: (movieId: number) => {
      if (!sessionId || !userDetails?.id) {
        throw new Error('Authentication required')
      }
      return favoritesApi.addToFavorites(movieId, sessionId, userDetails.id)
    },
    onSuccess: (_, movieId) => {
      queryClient.setQueryData<IFavoritesResponse>(['favorites', userDetails?.id], (old) => {
        if (!old)
          return {
            results: [{ id: movieId } as IMovie],
            page: 1,
            total_pages: 1,
            total_results: 1
          }
        return {
          ...old,
          results: [...old.results, { id: movieId } as IMovie],
          total_results: (old.total_results || 0) + 1
        }
      })
    }
  })
}

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient()
  const sessionId = useSessionId()
  const { data: userDetails } = useUserDetails()

  return useMutation({
    mutationFn: (movieId: number) => {
      if (!sessionId || !userDetails?.id) {
        throw new Error('Authentication required')
      }
      return favoritesApi.removeFromFavorites(movieId, sessionId, userDetails.id)
    },
    onSuccess: (_, movieId) => {
      queryClient.setQueryData<IFavoritesResponse>(['favorites', userDetails?.id], (old) => {
        if (!old)
          return {
            results: [],
            page: 1,
            total_pages: 0,
            total_results: 0
          }
        return {
          ...old,
          results: old.results.filter((m) => m.id !== movieId),
          total_results: Math.max((old.total_results || 1) - 1, 0)
        }
      })
    }
  })
}

export const useFavoriteMovies = (favoriteList: IFavoriteMovie[] | []) => {
  const movieQueries = useQueries({
    queries:
      favoriteList?.map(({ id }) => ({
        queryKey: ['movie', id],
        queryFn: async () => {
          const response = await movieApi.getById(id)
          return transformMovieDetails(response.data)
        },
        staleTime: 86400 * 1000
      })) || []
  })

  const isMoviesLoading = movieQueries.some((q) => q.isLoading)
  const isMoviesError = movieQueries.some((q) => q.isError)

  const movies = movieQueries.map((q) => q.data).filter((movie): movie is IMovieDetails => !!movie)

  return {
    movies,
    isMoviesLoading,
    isMoviesError
  }
}
