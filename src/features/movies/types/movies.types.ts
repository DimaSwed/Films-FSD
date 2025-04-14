import { IMovie } from '@/shared/types/common.types'

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
