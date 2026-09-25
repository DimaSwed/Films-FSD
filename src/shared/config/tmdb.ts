// TMDB недоступен напрямую из части сетей (блокировка DNS), поэтому браузер ходит на
// собственный домен, а дальше запросы проксируются: Vercel rewrites (prod) / Vite proxy (dev).
export const TMDB_API_BASE = '/tmdb/api'
export const TMDB_IMAGE_BASE = '/tmdb/img'
