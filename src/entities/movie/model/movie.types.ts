import type { IGenre, IMovie, IMovieRaw } from '@/shared/lib'

import type { IMovieTrailer, IMovieVideoRaw } from './movie-trailer.types'

/** Актёр и его роль в фильме. */
export interface ICastMember {
  /** Участие в фильме: один актёр может играть несколько ролей, поэтому ключ — не `id` человека. */
  creditId: string
  name: string
  /** Персонаж; TMDB обычно не переводит имена ролей. */
  character: string
  photo: string
}

export interface IMovieDetails {
  id: number
  title: string
  tagline: string
  rating: number
  voteCount: number
  image: string
  backgroundImage: string
  releaseDate: string
  /** Первый показ в кинотеатрах России (для старых фильмов это может быть повторный прокат). */
  releaseDateRu: string | null
  /** Российская возрастная маркировка, например `16+`. */
  ageRating: string | null
  genre: string
  year: number
  duration: number
  description: string
  countries: string[]
  /** Бюджет в долларах США; 0 — неизвестен. */
  budget: number
  directors: string[]
  cast: ICastMember[]
  trailer: IMovieTrailer | null
  recommendations: IMovie[]
}

export interface IAccountState {
  id: number
  favorite: boolean
  watchlist: boolean
}

export interface ICountryRaw {
  /** Код ISO 3166-1; TMDB использует и исторические (`SU`, `YU`), и собственные (`XC`, `XG`). */
  iso_3166_1: string
  /** Название всегда на английском, язык запроса не учитывается. */
  name: string
}

export interface ICreditsRaw {
  cast: {
    credit_id: string
    name: string
    character?: string
    profile_path: string | null
  }[]
  crew: { name: string; job: string }[]
}

export interface IReleaseDateRaw {
  /** 1 — премьера, 2 — ограниченный прокат, 3 — прокат, 4 — цифра, 5 — физический носитель, 6 — ТВ. */
  type: number
  release_date: string
  certification: string
}

export interface ICountryReleasesRaw {
  iso_3166_1: string
  release_dates: IReleaseDateRaw[]
}

/** Блоки из `append_to_response` необязательны: без любого из них страница фильма остаётся рабочей. */
export interface IApiMovieResponse {
  id: number
  title: string
  tagline?: string
  vote_average: number
  vote_count: number
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  runtime: number | null
  overview: string
  budget: number
  genres: IGenre[]
  production_countries?: ICountryRaw[]
  videos?: { results?: IMovieVideoRaw[] }
  credits?: ICreditsRaw
  recommendations?: { results?: IMovieRaw[] }
  release_dates?: { results?: ICountryReleasesRaw[] }
}
