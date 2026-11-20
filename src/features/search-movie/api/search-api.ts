import { api } from '@/shared/api'
import { IMovie, IMovieRaw, IPaginatedResponse, transformMovie } from '@/shared/lib'

import type { IMovieFilterParams } from '../model'

const toMoviesPage = (data: IPaginatedResponse<IMovieRaw>): IPaginatedResponse<IMovie> => ({
  ...data,
  results: data.results.map(transformMovie)
})

export const searchApi = {
  searchMovies: async (query: string, page = 1) => {
    const response = await api.get<IPaginatedResponse<IMovieRaw>>('/search/movie', {
      params: {
        query,
        page,
        language: 'ru-RU',
        region: 'RU'
      }
    })
    return toMoviesPage(response.data)
  },

  fetchByFilters: async (params: IMovieFilterParams, page = 1) => {
    const response = await api.get<IPaginatedResponse<IMovieRaw>>('/discover/movie', {
      params: {
        ...params,
        page,
        language: 'ru-RU',
        region: 'RU'
      }
    })
    return toMoviesPage(response.data)
  }
}
