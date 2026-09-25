import { api } from '@/shared/api/tmdb'
import { IAccountState, IApiMovieResponse } from '@/features/movie'

export const movieApi = {
  getById: (id: number) => api.get<IApiMovieResponse>(`/movie/${id}?language=ru-RU`),
  getWatchProviders: (id: number) => api.get(`/movie/${id}/watch/providers`),
  getAccountStates: async (id: number, sessionId: string): Promise<IAccountState> => {
    const response = await api.get<IAccountState>(`/movie/${id}/account_states`, {
      params: { session_id: sessionId }
    })
    return response.data
  }
}
