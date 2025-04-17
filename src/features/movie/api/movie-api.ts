import { api } from '@/shared/api/tmdb'
import { IApiMovieResponse } from '@/features/movie'

export const movieApi = {
  getById: (id: number) => api.get<IApiMovieResponse>(`/movie/${id}?language=ru-RU`)
  // addToWatchlist: (movieId: number, sessionId: string, accountId: number) =>
  //   api.post(
  //     `/account/${accountId}/watchlist`,
  //     {
  //       media_type: 'movie',
  //       media_id: movieId,
  //       watchlist: true
  //     },
  //     {
  //       params: { session_id: sessionId }
  //     }
  //   )
}
