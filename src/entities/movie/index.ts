// Публичное API слайса перечислено явно: сырые типы TMDB и внутренние хуки наружу не отдаём
export {
  getWatchlistKey,
  movieTrailerOptions,
  useMovie,
  useMovieAccountState,
  useUpdateMovieAccountState,
  useUpdateWatchlistCache,
  useWatchProviders
} from './model'
export type { IMovieDetails, IMovieTrailer, IWatchProvider } from './model'
export * from './ui'
