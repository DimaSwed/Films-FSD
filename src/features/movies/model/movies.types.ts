import { IMovie } from '@/shared/lib'

export interface ICategory {
  title: string
  movies: IMovie[]
  isLoading: boolean
}

export interface ITrailer {
  id: string
  key: string
  name: string
  site: string
  type: string
  rating?: number
}

export interface IMovieWithTrailer extends IMovie {
  trailerKey?: string
}

export interface IGenreProps {
  id: number
  title: string
}

export interface IMoviesFilters {
  include_adult?: string
  include_video?: string
  language?: string
  sort_by?: string
  region?: string
  with_genres?: number
}

/** Подборки главной: ключ → эндпоинт TMDB (см. `moviesApi.getCategoryPage`). */
export type TMovieCategory = 'trending' | 'now-playing' | 'popular' | 'upcoming' | 'top-rated'
