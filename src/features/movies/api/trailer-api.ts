import { api } from '@/shared/api/tmdb'

export const trailerApi = {
  getTrailers: (movieId: number) => api.get(`/movie/${movieId}/videos?language=ru-RU`)
}
