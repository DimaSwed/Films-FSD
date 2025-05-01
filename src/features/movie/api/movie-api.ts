import { api } from '@/shared/api/tmdb'
import { IApiMovieResponse } from '@/features/movie'

export const movieApi = {
  getById: (id: number) => api.get<IApiMovieResponse>(`/movie/${id}?language=ru-RU`),
  getWatchProviders: (id: number) => api.get(`/movie/${id}/watch/providers`)
}
