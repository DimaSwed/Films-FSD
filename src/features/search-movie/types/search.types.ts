import { IMovie } from '@/shared/types/common.types'

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

export interface IMovieFilterParams {
  with_genres?: number | ''
  sort_by: string
  with_original_language?: string
  primary_release_year?: string
  'primary_release_date.lte': string
}

export const CRITERIA_MAP: Record<string, string> = {
  new: 'release_date.desc',
  highRating: 'vote_average.desc',
  best: 'popularity.desc'
}

export const RECOMMENDATION_MAP: Record<string, string> = {
  recommendations: 'popularity.desc',
  rating: 'vote_average.desc',
  releaseDate: 'release_date.desc'
}
