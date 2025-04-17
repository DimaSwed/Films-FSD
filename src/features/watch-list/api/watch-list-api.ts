import { api } from '@/shared/api/tmdb'
import { IMovie, IPaginatedResponse } from '@/shared/types'
import { genreMap } from '@/shared/constants'

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
      results: response.data.results.map((movie: IMovie) => ({
        id: movie.id,
        title: movie.title,
        rating: movie.vote_average,
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        year: movie.release_date ? new Date(movie.release_date).getFullYear() : 0,
        releaseDate: movie.release_date,
        genre: (movie.genre_ids ?? []).map((id: number) => genreMap[id] || 'Неизвестно').join(', '),
        duration: movie.runtime ?? 0,
        description: movie.overview
      })),
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
  }
}
