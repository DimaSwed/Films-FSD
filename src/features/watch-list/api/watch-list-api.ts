import { api } from '@/shared/api'
import { TMDB_LANGUAGE } from '@/shared/config'
import { IMovie, IMovieRaw, IPaginatedResponse, loadAllPages, transformMovie } from '@/shared/lib'

/** В каком порядке `getWatchlistMovies` просит список у TMDB: от давно добавленных к недавним. */
export const WATCHLIST_SOURCE_ORDER = 'created_at.asc'

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
        language: TMDB_LANGUAGE,
        sort_by: WATCHLIST_SOURCE_ORDER,
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

  getAllWatchlistMovies: (sessionId: string, accountId: number): Promise<IMovie[]> =>
    loadAllPages((page) => watchListApi.getWatchlistMovies(sessionId, accountId, page))
}
