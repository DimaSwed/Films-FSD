// TMDB недоступен напрямую из части сетей (блокировка DNS), поэтому браузер ходит на
// собственный домен, а дальше запросы проксируются: Vercel rewrites (prod) / Vite proxy (dev).
export const TMDB_API_BASE = '/tmdb/api'
export const TMDB_IMAGE_BASE = '/tmdb/img'

/** Язык данных TMDB; на нём же форматируются даты и числа. */
export const TMDB_LANGUAGE = 'ru-RU'
/** Страна, для которой запрашиваются подборки, прокат и «Где смотреть». */
export const TMDB_REGION = 'RU'
