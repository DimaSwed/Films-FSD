import type { IMovie, IMovieRaw } from '@/shared/lib'

/** Фильм в фильмографии: поля фильма и участие человека в нём. */
interface IPersonCreditRaw extends IMovieRaw {
  credit_id: string
  vote_count?: number
  popularity?: number
}

export interface IPersonCastCreditRaw extends IPersonCreditRaw {
  character?: string
}

export interface IPersonCrewCreditRaw extends IPersonCreditRaw {
  /** Отдел на английском: `Directing`, `Writing`, `Production`… */
  department: string
  /** Должность на английском: `Director`, `Screenplay`, `Executive Producer`… */
  job: string
}

/** `movie_credits` необязателен: без него страница остаётся рабочей, только без фильмографии. */
export interface IPersonRaw {
  id: number
  name: string
  /** Другие написания имени; запасной источник русского, если `name` не переведён. */
  also_known_as?: string[]
  biography: string
  birthday: string | null
  deathday: string | null
  /** 0 — не указан, 1 — женский, 2 — мужской, 3 — небинарный. */
  gender: number
  known_for_department: string
  /** Обычно на английском (`London, England, UK`), язык запроса не учитывается. */
  place_of_birth: string | null
  profile_path: string | null
  movie_credits?: {
    cast?: IPersonCastCreditRaw[]
    crew?: IPersonCrewCreditRaw[]
  }
}

/** Направление работы в фильмографии; ключ — отдел TMDB, у актёров — `Acting`. */
export interface IPersonCreditGroup {
  department: string
  /** «Актёр», «Режиссёр», «Сценарист»… */
  label: string
  credits: IPersonCredit[]
}

/** Фильм в одной группе фильмографии; несколько ролей или должностей в фильме — одна запись. */
export interface IPersonCredit {
  movie: IMovie
  /** Персонажи (у актёров) или должности (у съёмочной группы) на русском; бывают пустыми. */
  roles: string[]
}

export interface IPersonDetails {
  id: number
  /** Имя по-русски, если TMDB его знает, иначе оригинальное. */
  name: string
  /** Оригинальное имя, если показываем русское; иначе `null`. */
  originalName: string | null
  photo: string
  biography: string
  birthday: string | null
  deathday: string | null
  placeOfBirth: string | null
  /** Чем известен: «Актриса», «Режиссёр»… */
  knownFor: string | null
  /** Самые известные фильмы — по числу оценок TMDB. */
  knownForMovies: IMovie[]
  /** Группы фильмографии; первой идёт основное направление. */
  filmography: IPersonCreditGroup[]
  /** Число разных фильмов во всех группах. */
  movieCount: number
}
