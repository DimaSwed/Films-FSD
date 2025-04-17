import { IMovie } from '@/shared/types'

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
  primary_release_year?: string
  certification_country?: string
  region?: string
  page?: number
  with_genres?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface IMovieCategoryProps {
  title: string
  movies: IMovie[]
  isLoading: boolean
}
