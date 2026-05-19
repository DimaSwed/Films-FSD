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
}

export interface IMovie {
  id: number
  title: string
  rating: number
  image: string
  year: number
  genre: string
  duration: number
  description?: string
  releaseDate?: string
}

export interface IGenre {
  id: number
  name: string
}

// Тип для элементов списка годов
export type YearLists =
  | 'до 1980'
  | '1980-1989'
  | '1990-1999'
  | '2000-2009'
  | '2010-2019'
  | '2020'
  | '2021'
  | '2022'
  | '2023'
  | '2024'
  | '2025'
  | '2026'

// Тип для объектов списка жанров
export interface IGenreLists {
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
