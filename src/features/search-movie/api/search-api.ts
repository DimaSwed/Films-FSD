import { api } from '@/shared/api/tmdb/api-client'
import { IMovie } from '@/shared/types/common.types'
import { GENRES_MAP } from '@/shared/constants/constants'

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
      docs: response.data.results.map((movie: IMovie) => ({
        id: movie.id,
        title: movie.title,
        rating: movie.vote_average,
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        year: movie.release_date ? new Date(movie.release_date).getFullYear() : 0,
        genre: (movie.genre_ids ?? []).map((id: number) => GENRES_MAP[id]).join(', '),
        duration: movie.runtime ?? 0
      })),
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
    return response.data.results.map((movie: IMovie) => ({
      id: movie.id,
      title: movie.title,
      rating: movie.vote_average,
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : 0,
      genre: (movie.genre_ids ?? []).map((id: number) => GENRES_MAP[id]).join(', '),
      duration: movie.runtime ?? 0
    }))
  }
}
