import { api } from '@/shared/api'
import { TMDB_LANGUAGE } from '@/shared/config'
import {
  IMovie,
  IMovieRaw,
  IPaginatedResponse,
  TMDB_MAX_PAGE,
  transformMovie,
  uniqueMovies
} from '@/shared/lib'

import type { TFavoritesOrder } from '../model'

export const favoritesApi = {
  addToFavorites: (movieId: number, sessionId: string, accountId: number) =>
    api.post(
      `/account/${accountId}/favorite`,
      {
        media_type: 'movie',
        media_id: movieId,
        favorite: true
      },
      {
        params: { session_id: sessionId }
      }
    ),

  getFavorites: async (
    sessionId: string,
    accountId: number,
    order: TFavoritesOrder,
    page: number = 1
  ): Promise<IPaginatedResponse<IMovie>> => {
    if (!sessionId || !accountId) {
      throw new Error('Authentication required')
    }

    const response = await api.get(`/account/${accountId}/favorite/movies`, {
      params: {
        language: TMDB_LANGUAGE,
        sort_by: order,
        session_id: sessionId,
        page
      }
    })

    return {
      results: response.data.results.map((raw: IMovieRaw) => transformMovie(raw)),
      page: response.data.page,
      total_pages: response.data.total_pages,
      total_results: response.data.total_results
    }
  },

  /**
   * Загружает весь список: сначала первую страницу (из неё узнаём число страниц),
   * потом остальные одновременно. Если список изменился посреди загрузки, один фильм
   * может прийти дважды — повторы убираем.
   */
  getAllFavorites: async (
    sessionId: string,
    accountId: number,
    order: TFavoritesOrder
  ): Promise<IMovie[]> => {
    const first = await favoritesApi.getFavorites(sessionId, accountId, order, 1)

    const rest = await Promise.all(
      Array.from({ length: Math.min(first.total_pages, TMDB_MAX_PAGE) - 1 }, (_, i) =>
        favoritesApi.getFavorites(sessionId, accountId, order, i + 2)
      )
    )

    return uniqueMovies([first, ...rest].flatMap((page) => page.results))
  },

  removeFromFavorites: async (
    movieId: number,
    sessionId: string,
    accountId: number
  ): Promise<void> => {
    await api.post(
      `/account/${accountId}/favorite`,
      {
        media_type: 'movie',
        media_id: movieId,
        favorite: false
      },
      {
        params: {
          session_id: sessionId
        }
      }
    )
  }
}
