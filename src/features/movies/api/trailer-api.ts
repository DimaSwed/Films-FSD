// src/features/movies/api/trailer-api.ts
import { api } from '@/shared/api/tmdb/api-client'

export const trailerApi = {
  getTrailers: (movieId: number) => api.get(`/movie/${movieId}/videos?language=ru-RU`)
}
