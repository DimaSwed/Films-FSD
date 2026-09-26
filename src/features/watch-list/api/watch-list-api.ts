import { api } from '@/shared/api'
import { IMovie, IMovieRaw, IPaginatedResponse } from '@/shared/types'
import { transformMovie } from '@/shared/lib'

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

  /** Первая страница, затем остальные параллельно (total_pages известен после первой). */
  getAllWatchlistMovies: async (sessionId: string, accountId: number): Promise<IMovie[]> => {
    const first = await watchListApi.getWatchlistMovies(sessionId, accountId, 1)

    const rest = await Promise.all(
      Array.from({ length: Math.max(first.total_pages - 1, 0) }, (_, i) =>
        watchListApi.getWatchlistMovies(sessionId, accountId, i + 2)
      )
    )

    return [first, ...rest].flatMap((page) => page.results)
  }
}
