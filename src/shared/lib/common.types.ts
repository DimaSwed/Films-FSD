export interface IMovieRaw {
  id: number
  title: string
  vote_average: number
  poster_path: string | null
  backdrop_path?: string | null
  release_date: string
  genre_ids: number[]
  runtime?: number | null
  overview?: string
  /** Оценка пользователя; приходит только в списке оценённых фильмов (`/account/{id}/rated/movies`). */
  rating?: number
}

export interface IMovie {
  id: number
  title: string
  rating: number
  image: string
  /** Небольшой горизонтальный кадр (16:9, 300 px); пустая строка, если у фильма его нет. */
  backdrop: string
  /**
   * Путь кадра в TMDB (`/abc.jpg`) или `null`: крупный кадр (баннер главной) строится через
   * `getTmdbImageUrl` нужного размера, а не растягиванием 300-пиксельного `backdrop`.
   */
  backdropPath: string | null
  year: number
  genre: string
  duration: number
  description?: string
  releaseDate?: string
  /** Оценка пользователя (до 10, шаг 0,5); есть только у фильмов из списка «Просмотрено». */
  userRating?: number
}

export interface IGenre {
  id: number
  name: string
}

export interface IApiError extends Error {
  response?: {
    data?: {
      status_code?: number
      status_message?: string
    }
    status?: number
  }
}

export interface ITMDBError {
  status_code: number
  status_message: string
  success?: boolean
}

export interface IPaginatedResponse<T> {
  results: T[]
  page: number
  total_pages: number
  total_results: number
}
