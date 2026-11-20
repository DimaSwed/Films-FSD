export interface IReleaseDateRange {
  'primary_release_date.gte'?: string
  'primary_release_date.lte': string
}

const pad = (value: number) => String(value).padStart(2, '0')

/** Локальная дата `YYYY-MM-DD` (не UTC: `toISOString` в UTC+ сдвигает «сегодня» на день назад ночью). */
const toIsoDate = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

/**
 * Переводит значение фильтра «Год» (`2024`, `2010-2019`, `до 1980` или пусто) в диапазон дат для
 * `discover/movie`: TMDB в `primary_release_year` принимает только один год.
 * Верхняя граница не позже `today` — ещё не вышедшие фильмы в выдачу не попадают.
 */
export const getReleaseDateRange = (year: string, today: Date = new Date()): IReleaseDateRange => {
  const todayIso = toIsoDate(today)
  const capToToday = (date: string) => (date < todayIso ? date : todayIso)

  if (!year) return { 'primary_release_date.lte': todayIso }

  if (year.startsWith('до')) {
    const before = Number(year.replace(/\D/g, ''))
    return { 'primary_release_date.lte': capToToday(`${before - 1}-12-31`) }
  }

  const [start, end = start] = year.split('-')

  return {
    'primary_release_date.gte': `${start}-01-01`,
    'primary_release_date.lte': capToToday(`${end}-12-31`)
  }
}
