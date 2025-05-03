import { IMovie } from '@/shared/types'

export interface IFavoritesResponse {
  results: IMovie[]
  page: number
  total_pages: number
  total_results: number
}

export interface IFavoriteMovie {
  id: number
}
