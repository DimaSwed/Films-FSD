import { api } from '@/shared/api/tmdb'
import { IMovie, IMovieRaw } from '@/shared/types'
import { transformMovie } from '@/shared/lib'
import { IMoviesFilters } from '@/features/movies'

export const moviesApi = {
  getUpcoming: async (): Promise<IMovie[]> => {
    const response = await api.get<{ results: IMovieRaw[] }>(
      '/movie/upcoming?language=ru-RU&page=1&region=RU'
    )
    if (!response.data || !response.data.results) {
      throw new Error('Upcoming movies not found')
    }
    return response.data.results.map(transformMovie)
  },

  getTopRated: async (): Promise<IMovie[]> => {
    const response = await api.get<{ results: IMovieRaw[] }>(
      '/movie/top_rated?language=ru-RU&page=1&region=RU'
    )
    if (!response.data || !response.data.results) {
      throw new Error('Top rated movies not found')
    }
    return response.data.results.map(transformMovie)
  },

  getTrending: async (): Promise<IMovie[]> => {
    const response = await api.get<{ results: IMovieRaw[] }>('/trending/movie/week?language=ru-RU')
    if (!response.data || !response.data.results) {
      throw new Error('Trending movies not found')
    }
    return response.data.results.map(transformMovie)
  },

  getNowPlaying: async (): Promise<IMovie[]> => {
    const response = await api.get<{ results: IMovieRaw[] }>(
      '/movie/now_playing?language=ru-RU&page=1&region=RU'
    )
    if (!response.data || !response.data.results) {
      throw new Error('Now playing movies not found')
    }
    return response.data.results.map(transformMovie)
  },

  getPopular: async (): Promise<IMovie[]> => {
    const response = await api.get<{ results: IMovieRaw[] }>(
      '/movie/popular?language=ru-RU&page=1&region=RU'
    )
    if (!response.data || !response.data.results) {
      throw new Error('Popular movies not found')
    }
    return response.data.results.map(transformMovie)
  },

  getByFilters: async (params: IMoviesFilters): Promise<IMovie[]> => {
    const response = await api.get<{ results: IMovieRaw[] }>('/discover/movie', {
      params: {
        ...params,
        language: params.language || 'ru-RU',
        region: params.region || 'RU'
      }
    })
    if (!response.data || !response.data.results) {
      throw new Error('Movies not found')
    }
    return response.data.results.map(transformMovie)
  }
}
