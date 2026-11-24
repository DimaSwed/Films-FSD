import type { IMovie } from './common.types'

/**
 * Варианты сортировки личных списков («К просмотру», «Избранное», «Просмотрено»).
 * `added-*` — по дате добавления в список: её знает только TMDB, у фильма такого поля нет,
 * поэтому порядок задаётся при загрузке, а не функцией `sortMovies`.
 */
export type TMovieSort =
  'added-desc' | 'added-asc' | 'release-desc' | 'rating-desc' | 'user-rating-desc' | 'title-asc'

/** Сортировки по полям самого фильма — их можно сделать на клиенте. */
type TFieldSort = Exclude<TMovieSort, 'added-desc' | 'added-asc'>

export interface IMovieSortOption {
  value: TMovieSort
  label: string
}

/** Сортировки по умолчанию; список со своими вариантами передаёт их в `MovieListToolbar`. */
export const MOVIE_SORT_OPTIONS: readonly IMovieSortOption[] = [
  { value: 'added-desc', label: 'Сначала недавно добавленные' },
  { value: 'added-asc', label: 'Сначала давно добавленные' },
  { value: 'release-desc', label: 'Новые релизы' },
  { value: 'rating-desc', label: 'По рейтингу' },
  { value: 'title-asc', label: 'По названию (А–Я)' }
]

/** Сортировка «по дате добавления»: порядок приходит с сервера, по данным фильма его не собрать. */
export const isAddedOrder = (sort: TMovieSort): sort is 'added-desc' | 'added-asc' =>
  sort === 'added-desc' || sort === 'added-asc'

const normalize = (text: string) => text.toLowerCase().replace(/ё/g, 'е').trim()

/** Поиск по названию без учёта регистра и разницы между «е» и «ё». Пустой запрос ничего не фильтрует. */
export const filterMoviesByTitle = (movies: IMovie[], query: string): IMovie[] => {
  const normalized = normalize(query)
  return normalized ? movies.filter((movie) => normalize(movie.title).includes(normalized)) : movies
}

const getReleaseTime = (movie: IMovie): number | null => {
  const time = movie.releaseDate ? Date.parse(movie.releaseDate) : NaN
  return Number.isNaN(time) ? null : time
}

type TComparator = (a: IMovie, b: IMovie) => number

/** Как сравнивать два фильма для каждой сортировки. Новая сортировка — новая строка здесь. */
const COMPARATORS: Record<TFieldSort, TComparator> = {
  // Сначала самые новые, фильмы без даты — в конец.
  'release-desc': (a, b) => {
    const timeA = getReleaseTime(a)
    const timeB = getReleaseTime(b)

    if (timeA === null) return timeB === null ? 0 : 1
    if (timeB === null) return -1
    return timeB - timeA
  },
  'rating-desc': (a, b) => b.rating - a.rating,
  'user-rating-desc': (a, b) => (b.userRating ?? 0) - (a.userRating ?? 0),
  'title-asc': (a, b) => a.title.localeCompare(b.title, 'ru')
}

/** Возвращает отсортированную копию. Для `added-*` список остаётся как есть. */
export const sortMovies = (movies: IMovie[], sort: TMovieSort): IMovie[] =>
  isAddedOrder(sort) ? movies : [...movies].sort(COMPARATORS[sort])

interface IMovieListView {
  query: string
  sort: TMovieSort
}

/** Применяет к списку поиск по названию, затем сортировку. Одинаково для всех личных списков. */
export const applyMovieListView = (movies: IMovie[], { query, sort }: IMovieListView): IMovie[] =>
  sortMovies(filterMoviesByTitle(movies, query), sort)
