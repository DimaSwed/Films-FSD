import { api } from '@/shared/api'
import type { IAccountState, IApiMovieResponse } from '../model'

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
