import { getTmdbImageUrl, transformMovie } from '@/shared/lib'

import type {
  IPersonCastCreditRaw,
  IPersonCredit,
  IPersonCreditGroup,
  IPersonCrewCreditRaw,
  IPersonDetails,
  IPersonRaw
} from '../model'

import {
  ACTING_DEPARTMENT,
  getCharacterLabel,
  getDepartmentLabel,
  getJobLabel
} from './person-labels'

/** Сколько фильмов в ряду «Известность». */
const KNOWN_FOR_LIMIT = 15

/** Только русский алфавит: украинское или сербское написание за русское не выдаём. */
const RUSSIAN_NAME = /^[а-яё][а-яё\s.'’-]*$/i

/**
 * На `ru-RU` TMDB обычно отдаёт имя по-русски (замер 2026-11-26), но перевод есть не у всех:
 * тогда ищем русское среди других написаний, а оригинальное показываем строкой ниже.
 */
const getNames = (raw: IPersonRaw): Pick<IPersonDetails, 'name' | 'originalName'> => {
  if (RUSSIAN_NAME.test(raw.name)) return { name: raw.name, originalName: null }
  const russian = raw.also_known_as?.find((alias) => RUSSIAN_NAME.test(alias.trim()))
  return russian
    ? { name: russian.trim(), originalName: raw.name }
    : { name: raw.name, originalName: null }
}

type TCreditRaw = IPersonCastCreditRaw | IPersonCrewCreditRaw

const isCrew = (credit: TCreditRaw): credit is IPersonCrewCreditRaw => 'job' in credit

const getRole = (credit: TCreditRaw) =>
  isCrew(credit) ? getJobLabel(credit.job) : getCharacterLabel(credit.character)

/** Даты TMDB — строки `YYYY-MM-DD`, поэтому их можно сравнивать как строки; без даты — в конец. */
const byReleaseDateDesc = (a: IPersonCredit, b: IPersonCredit) => {
  const dateA = a.movie.releaseDate ?? ''
  const dateB = b.movie.releaseDate ?? ''
  if (!dateA || !dateB) return dateA ? -1 : dateB ? 1 : 0
  return dateB.localeCompare(dateA)
}

/** Один фильм — одна запись группы: несколько ролей или должностей в нём собираются вместе. */
const toCredits = (credits: TCreditRaw[]): IPersonCredit[] => {
  const byMovie = new Map<number, IPersonCredit>()
  for (const credit of credits) {
    const entry = byMovie.get(credit.id) ?? { movie: transformMovie(credit), roles: [] }
    const role = getRole(credit)
    if (role && !entry.roles.includes(role)) entry.roles.push(role)
    byMovie.set(credit.id, entry)
  }
  return [...byMovie.values()].sort(byReleaseDateDesc)
}

const getFilmography = (raw: IPersonRaw): IPersonCreditGroup[] => {
  const byDepartment = new Map<string, TCreditRaw[]>()
  const add = (department: string, credit: TCreditRaw) => {
    const list = byDepartment.get(department)
    if (list) list.push(credit)
    else byDepartment.set(department, [credit])
  }
  for (const credit of raw.movie_credits?.cast ?? []) add(ACTING_DEPARTMENT, credit)
  for (const credit of raw.movie_credits?.crew ?? []) add(credit.department, credit)

  const groups = [...byDepartment].map(([department, credits]) => ({
    department,
    label: getDepartmentLabel(department, raw.gender),
    credits: toCredits(credits)
  }))

  // Основное направление первым, остальные — по числу фильмов
  return groups.sort(
    (a, b) =>
      Number(b.department === raw.known_for_department) -
        Number(a.department === raw.known_for_department) || b.credits.length - a.credits.length
  )
}

/** Самые известные фильмы основного направления — по числу оценок TMDB, как «Известность» на TMDB. */
const getKnownForMovies = (raw: IPersonRaw, filmography: IPersonCreditGroup[]) => {
  const main = filmography[0]
  if (!main) return []
  const credits: TCreditRaw[] =
    main.department === ACTING_DEPARTMENT
      ? (raw.movie_credits?.cast ?? [])
      : (raw.movie_credits?.crew ?? []).filter(({ department }) => department === main.department)
  const voteCount = new Map(credits.map(({ id, vote_count }) => [id, vote_count ?? 0]))

  return main.credits
    .map(({ movie }) => movie)
    .filter(({ id }) => (voteCount.get(id) ?? 0) > 0)
    .sort((a, b) => (voteCount.get(b.id) ?? 0) - (voteCount.get(a.id) ?? 0))
    .slice(0, KNOWN_FOR_LIMIT)
}

export const transformPerson = (raw: IPersonRaw): IPersonDetails => {
  const filmography = getFilmography(raw)
  const movieIds = new Set(
    filmography.flatMap(({ credits }) => credits.map(({ movie }) => movie.id))
  )

  return {
    id: raw.id,
    ...getNames(raw),
    photo: getTmdbImageUrl(raw.profile_path),
    biography: raw.biography.trim(),
    birthday: raw.birthday,
    deathday: raw.deathday,
    placeOfBirth: raw.place_of_birth,
    knownFor: raw.known_for_department
      ? getDepartmentLabel(raw.known_for_department, raw.gender)
      : null,
    knownForMovies: getKnownForMovies(raw, filmography),
    filmography,
    movieCount: movieIds.size
  }
}
