import { IMovie } from '@/shared/lib'

export type Movie = Pick<IMovie, 'id' | 'title' | 'rating' | 'year'>

export interface IMovieFilterParams {
  with_genres?: number | ''
  sort_by: string
  with_origin_country?: string
  'primary_release_date.gte'?: string
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
