/**
 * Год из даты TMDB (`YYYY-MM-DD`); 0 — неизвестен. Берём из строки: `new Date()` прочитал бы её как
 * полночь UTC, и западнее Гринвича 1 января стало бы прошлым годом.
 */
export const getReleaseYear = (date: string | null | undefined): number =>
  Number(date?.slice(0, 4)) || 0
