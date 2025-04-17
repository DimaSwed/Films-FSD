export interface IMovie {
  id: number
  title: string
  rating: number
  image: string
  year: number
  genre: string | string[]
  duration: number | string
  description?: string
  backgroundImage?: string
  releaseDate?: string
  vote_average?: number
  release_date?: Date
  genre_ids?: number[]
  poster_path?: string
  runtime?: number
  overview?: string
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
