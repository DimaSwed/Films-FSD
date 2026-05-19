import { api } from '@/shared/api/tmdb'
import { IMovie, IMovieRaw, IPaginatedResponse } from '@/shared/types'
import { transformMovie } from '@/shared/lib'

interface IAccountState {
  id: number
  watchlist: boolean
  favorite: boolean
}

export const watchListApi = {
  addToWatchlist: (movieId: number, sessionId: string, accountId: number) =>
    api.post(
      `/account/${accountId}/watchlist`,
      {
        media_type: 'movie',
        media_id: movieId,
        watchlist: true
      },
      {
        params: { session_id: sessionId }
      }
    ),

  getWatchlistMovies: async (
    sessionId: string,
    accountId: number,
    page: number = 1
  ): Promise<IPaginatedResponse<IMovie>> => {
    if (!sessionId || !accountId) {
      throw new Error('Требуется авторизация')
    }

    const response = await api.get(`/account/${accountId}/watchlist/movies`, {
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

  removeMovieFromWatchlist: async (
    movieId: number,
    sessionId: string,
    accountId: number
  ): Promise<void> => {
    await api.post(
      `/account/${accountId}/watchlist`,
      {
        media_type: 'movie',
        media_id: movieId,
        watchlist: false
      },
      {
        params: {
          session_id: sessionId
        }
      }
    )
  },

  getWatchlistStatus: async (movieId: number, sessionId: string): Promise<IAccountState> => {
    const response = await api.get<IAccountState>(`/movie/${movieId}/account_states`, {
      params: { session_id: sessionId }
    })
    return response.data
  }
}
