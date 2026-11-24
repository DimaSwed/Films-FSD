import { api } from '@/shared/api'
import { TMDB_LANGUAGE, TMDB_REGION } from '@/shared/config'
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
        language: TMDB_LANGUAGE,
        region: TMDB_REGION
      }
    })
    return toMoviesPage(response.data)
  },

  fetchByFilters: async (params: IMovieFilterParams, page = 1) => {
    const response = await api.get<IPaginatedResponse<IMovieRaw>>('/discover/movie', {
      params: {
        ...params,
        page,
        language: TMDB_LANGUAGE,
        region: TMDB_REGION
      }
    })
    return toMoviesPage(response.data)
  }
}
