import { api } from '@/shared/api/tmdb'
import { IMovieRaw } from '@/shared/types'
import { transformMovie } from '@/shared/lib'

export const searchApi = {
  searchMovies: async (query: string) => {
    const response = await api.get('/search/movie', {
      params: {
        query,
        page: 1,
        language: 'ru-RU',
        region: 'RU'
      }
    })
    return {
      docs: response.data.results.map((raw: IMovieRaw) => transformMovie(raw)),
      page: response.data.page,
      limit: response.data.total_pages
    }
  },

  fetchByFilters: async (params: Record<string, string | number | boolean>) => {
    const response = await api.get('/discover/movie', {
      params: {
        ...params,
        language: 'ru-RU',
        region: 'RU'
      }
    })
    return response.data.results.map((raw: IMovieRaw) => transformMovie(raw))
  }
}
