import { TMDB_LANGUAGE } from '@/shared/config'

const dateFormat = new Intl.DateTimeFormat(TMDB_LANGUAGE, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  // Даты TMDB — полночь UTC: в часовых поясах западнее Гринвича иначе показался бы предыдущий день
  timeZone: 'UTC'
})

const moneyFormat = new Intl.NumberFormat(TMDB_LANGUAGE, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})

const numberFormat = new Intl.NumberFormat(TMDB_LANGUAGE)
const pluralRules = new Intl.PluralRules(TMDB_LANGUAGE)

const VOTES: Partial<Record<Intl.LDMLPluralRule, string>> = {
  one: 'оценка',
  few: 'оценки',
  many: 'оценок'
}

/** `null`, если даты нет или она некорректна: `Intl` на такой бросает RangeError и уронил бы страницу. */
export const formatDate = (value: string | null): string | null => {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : dateFormat.format(date)
}

export const formatMoney = (amount: number) => moneyFormat.format(amount)

export const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return [hours > 0 && `${hours} ч.`, rest > 0 && `${rest} мин.`].filter(Boolean).join(' ')
}

export const formatVotes = (count: number) =>
  `${numberFormat.format(count)} ${VOTES[pluralRules.select(count)] ?? 'оценок'}`
