import { IMovie } from '@/shared/types/common.types'

export interface ICategory {
  title: string
  movies: IMovie[]
  isLoading: boolean
}
