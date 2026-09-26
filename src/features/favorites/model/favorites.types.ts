import { IMovie } from '@/shared/lib'

export interface IFavoritesResponse {
  results: IMovie[]
  page: number
  total_pages: number
  total_results: number
}
