import { api } from '@/shared/api/tmdb'
import { IMovie, IMovieRaw, IPaginatedResponse } from '@/shared/types'
import { transformMovie } from '@/shared/lib'

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
    page: number = 1
  ): Promise<IPaginatedResponse<IMovie>> => {
    if (!sessionId || !accountId) {
      throw new Error('Authentication required')
    }

    const response = await api.get(`/account/${accountId}/favorite/movies`, {
      params: {
        language: 'ru-RU',
        sort_by: 'created_at.asc',
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
