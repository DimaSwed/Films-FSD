import type { ICountryRaw } from '../model'

/**
 * Исторические и собственные коды TMDB: `Intl` их не знает или называет преемника (СССР → «Россия»).
 * Плюс страны, у которых официальное имя из `Intl` непривычно.
 */
const COUNTRY_NAMES = new Map([
  ['AN', 'Нидерландские Антилы'],
  ['CS', 'Сербия и Черногория'],
  ['HK', 'Гонконг'],
  ['KR', 'Южная Корея'],
  ['SU', 'СССР'],
  ['US', 'США'],
  ['XC', 'Чехословакия'],
  ['XG', 'ГДР'],
  ['XI', 'Северная Ирландия'],
  ['YU', 'Югославия'],
  ['ZR', 'Заир']
])

const regionNames = new Intl.DisplayNames('ru', { type: 'region', fallback: 'none' })

/** Название страны по-русски; если перевода нет — английское из TMDB. */
export const getCountryName = ({ iso_3166_1: code, name }: ICountryRaw): string => {
  const customName = COUNTRY_NAMES.get(code)
  if (customName) return customName

  try {
    return regionNames.of(code) ?? name
  } catch {
    // Некорректный код: `of` бросает RangeError
    return name
  }
}
