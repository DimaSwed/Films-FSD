import type { IMovieTrailer } from '@/entities/movie'
import { IMovie } from '@/shared/lib'

export interface ICategory {
  title: string
  movies: IMovie[]
  isLoading: boolean
}

/** Фильм в списке трейлеров. Фильмов без ролика в списке нет — они отсеиваются. */
export type TTrailerItem =
  | { status: 'pending' | 'error'; movie: IMovie }
  | { status: 'ready'; movie: IMovie; trailer: IMovieTrailer }

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
