import { api } from '@/shared/api/tmdb'
import { IMovie } from '@/shared/types'
import { IMoviesFilters } from '@/features/movies'

export const moviesApi = {
  getUpcoming: async () => {
    const response = await api.get<{ results: IMovie[] }>(
      '/movie/upcoming?language=ru-RU&page=1&region=RU'
    )
    if (!response.data || !response.data.results) {
      throw new Error('Upcoming movies not found')
    }
    return response.data.results
  },

  getTopRated: async () => {
    const response = await api.get<{ results: IMovie[] }>(
      '/movie/top_rated?language=ru-RU&page=1&region=RU'
    )
    if (!response.data || !response.data.results) {
      throw new Error('Top rated movies not found')
    }
    return response.data.results
  },

  getTrending: async () => {
    const response = await api.get<{ results: IMovie[] }>('/trending/movie/week?language=ru-RU')
    if (!response.data || !response.data.results) {
      throw new Error('Trending movies not found')
    }
    return response.data.results
  },

  getNowPlaying: async () => {
    const response = await api.get<{ results: IMovie[] }>(
      '/movie/now_playing?language=ru-RU&page=1&region=RU'
    )
    if (!response.data || !response.data.results) {
      throw new Error('Now playing movies not found')
    }
    return response.data.results
  },

  getPopular: async () => {
    const response = await api.get<{ results: IMovie[] }>(
      '/movie/popular?language=ru-RU&page=1&region=RU'
    )
    if (!response.data || !response.data.results) {
      throw new Error('Popular movies not found')
    }
    return response.data.results
  },

  getByFilters: async (params: IMoviesFilters) => {
    const response = await api.get<{ results: IMovie[] }>('/discover/movie', {
      params: {
        ...params,
        language: params.language || 'ru-RU',
        region: params.region || 'RU'
      }
    })
    if (!response.data || !response.data.results) {
      throw new Error('Movies not found')
    }
    return response.data.results
  }
}
