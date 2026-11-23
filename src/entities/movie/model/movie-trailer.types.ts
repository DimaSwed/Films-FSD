/** Сырой ролик TMDB (`/movie/{id}/videos`). */
export interface IMovieVideoRaw {
  key: string
  site: string
  /** `Trailer`, `Teaser`, `Clip`, `Featurette` и др. */
  type: string
  /** Код ISO 639-1; `xx` или `null` — ролик без языка. */
  iso_639_1: string | null
  official?: boolean
  published_at?: string
}

export interface IMovieVideosResponse {
  id: number
  results?: IMovieVideoRaw[]
}

export interface IMovieTrailer {
  /** Идентификатор ролика на YouTube. */
  key: string
  type: 'Trailer' | 'Teaser'
  language: 'ru' | 'en' | null
}
