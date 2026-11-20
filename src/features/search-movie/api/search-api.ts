import { api } from '@/shared/api'
import { IMovieRaw, transformMovie } from '@/shared/lib'

import type { IMovieFilterParams } from '../model'

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

  fetchByFilters: async (params: IMovieFilterParams) => {
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
