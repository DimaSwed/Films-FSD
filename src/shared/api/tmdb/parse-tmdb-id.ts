/**
 * Номер записи TMDB (фильма, человека) из адреса или `undefined`. `Number()` не годится: он превращает
 * `1e3` в 1000, а `0x25b` — в 603, и по кривой ссылке открылась бы посторонняя страница.
 */
export const parseTmdbId = (value = ''): number | undefined => {
  if (!/^[1-9]\d*$/.test(value)) return undefined
  const id = Number(value)
  return Number.isSafeInteger(id) ? id : undefined
}
