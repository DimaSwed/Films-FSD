import { IMovie } from '@/shared/lib'

export interface IFavoritesResponse {
  results: IMovie[]
  page: number
  total_pages: number
  total_results: number
}

/** Порядок списка у TMDB — по дате добавления в избранное. */
export type TFavoritesOrder = 'created_at.asc' | 'created_at.desc'
