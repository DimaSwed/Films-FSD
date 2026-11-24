import { api } from '@/shared/api'
import { TMDB_LANGUAGE } from '@/shared/config'
import { IMovie, IMovieRaw, IPaginatedResponse, TAddedOrder, transformMovie } from '@/shared/lib'

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
    order: TAddedOrder,
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
