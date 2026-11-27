import { TMDB_LANGUAGE } from '@/shared/config'

const dateFormat = new Intl.DateTimeFormat(TMDB_LANGUAGE, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  // Даты TMDB — полночь UTC: западнее Гринвича иначе показался бы предыдущий день
  timeZone: 'UTC'
})

const pluralRules = new Intl.PluralRules(TMDB_LANGUAGE)

const YEARS: Partial<Record<Intl.LDMLPluralRule, string>> = {
  one: 'год',
  few: 'года',
  many: 'лет'
}

const MOVIES: Partial<Record<Intl.LDMLPluralRule, string>> = {
  one: 'фильм',
  few: 'фильма',
  many: 'фильмов'
}

const plural = (count: number, forms: Partial<Record<Intl.LDMLPluralRule, string>>) =>
  `${count} ${forms[pluralRules.select(count)] ?? forms.many}`

const parseDate = (value: string | null): Date | null => {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

/** «18 декабря 1963»; `null`, если даты нет или она некорректна. */
export const formatPersonDate = (value: string | null): string | null => {
  const date = parseDate(value)
  return date && dateFormat.format(date)
}

/**
 * Сегодняшняя дата пользователя в виде `YYYY-MM-DD`, как у дат TMDB. `toISOString()` не годится:
 * он берёт дату по UTC, и в Москве до трёх ночи «сегодня» было бы ещё вчера.
 */
export const getLocalIsoDate = (date = new Date()) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-')

/** Полных лет между датами (без даты смерти — на сегодня); `null`, если дата рождения неизвестна. */
export const getAge = (birthday: string | null, until: string | null, today = new Date()) => {
  const from = parseDate(birthday)
  const to = parseDate(until ?? getLocalIsoDate(today))
  if (!from || !to) return null

  const age = to.getUTCFullYear() - from.getUTCFullYear()
  const hadBirthday =
    to.getUTCMonth() > from.getUTCMonth() ||
    (to.getUTCMonth() === from.getUTCMonth() && to.getUTCDate() >= from.getUTCDate())
  const result = hadBirthday ? age : age - 1
  return result >= 0 ? result : null
}

export const formatYears = (count: number) => plural(count, YEARS)

export const formatMovieCount = (count: number) => plural(count, MOVIES)
