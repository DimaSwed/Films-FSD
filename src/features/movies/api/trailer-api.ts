import { api } from '@/shared/api'

export const trailerApi = {
  getTrailers: (movieId: number) => api.get(`/movie/${movieId}/videos?language=ru-RU`)
}
