import { api } from '@/shared/api'
import { TMDB_LANGUAGE } from '@/shared/config'
import { IMovie, IMovieRaw, IPaginatedResponse, TAddedOrder, transformMovie } from '@/shared/lib'

export const rateMovieApi = {
  /** Ставит или меняет оценку. По умолчанию TMDB сам убирает оценённый фильм из «К просмотру». */
  rate: async (movieId: number, value: number, sessionId: string): Promise<void> => {
    await api.post(`/movie/${movieId}/rating`, { value }, { params: { session_id: sessionId } })
  },

  removeRating: async (movieId: number, sessionId: string): Promise<void> => {
    await api.delete(`/movie/${movieId}/rating`, { params: { session_id: sessionId } })
  },

  getRatedMovies: async (
    sessionId: string,
    accountId: number,
    order: TAddedOrder,
    page: number
  ): Promise<IPaginatedResponse<IMovie>> => {
    const { data } = await api.get<IPaginatedResponse<IMovieRaw>>(
      `/account/${accountId}/rated/movies`,
      { params: { language: TMDB_LANGUAGE, sort_by: order, session_id: sessionId, page } }
    )

    return { ...data, results: data.results.map(transformMovie) }
  }
}
