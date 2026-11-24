// Публичное API слайса перечислено явно: сырые типы TMDB и внутренние хуки наружу не отдаём
export {
  getWatchlistKey,
  movieTrailerOptions,
  useMovie,
  useMovieAccountState,
  useUpdateMovieAccountState,
  useWatchProviders
} from './model'
export type { IMovieDetails, IMovieTrailer } from './model'
export * from './ui'
