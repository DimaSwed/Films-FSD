import { IMovie } from '@/shared/types/types'

export type Movie = Pick<IMovie, 'id' | 'title' | 'rating' | 'year'>

type RequiredMovieFields = Pick<
  IMovie,
  'id' | 'title' | 'rating' | 'image' | 'year' | 'genre' | 'duration'
>

export interface IMoviesResponseData {
  docs: RequiredMovieFields[]
  page: number
  limit: number
}
