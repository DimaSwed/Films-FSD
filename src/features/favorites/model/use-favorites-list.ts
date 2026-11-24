import { useSessionId, useUserDetails } from '@/entities/user'
import { useAccountMovieList } from '@/shared/lib'

import { favoritesApi } from '../api'

import { getFavoritesKey } from './favorites.keys'

/** Список избранного с поиском и сортировкой. */
export const useFavoritesList = () => {
  const sessionId = useSessionId()
  const { data: userDetails } = useUserDetails()
  const userId = userDetails?.id

  return useAccountMovieList({
    baseKey: getFavoritesKey(userId),
    enabled: !!sessionId && !!userId,
    fetchPage: (order, page) => favoritesApi.getFavorites(sessionId!, userId!, order, page)
  })
}
