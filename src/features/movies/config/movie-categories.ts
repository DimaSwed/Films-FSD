import type { TMovieCategory } from '../model'

interface IMovieCategoryConfig {
  /** Часть адреса `/category/:categorySlug`. Меняя её, добавьте старое значение в `RENAMED_CATEGORY_SLUGS`. */
  slug: string
  title: string
  category: TMovieCategory
}

/** Подборки главной в порядке показа: заголовок, адрес и эндпоинт TMDB — в одном месте. */
export const MOVIE_CATEGORIES = [
  { slug: 'сейчас-в-тренде', title: 'Сейчас в тренде', category: 'trending' },
  { slug: 'сейчас-в-прокате', title: 'Сейчас в прокате', category: 'now-playing' },
  // `movie/popular` — текущая популярность TMDB, а не «за месяц» (п. 1.4, баг 5).
  { slug: 'популярные-сейчас', title: 'Популярные сейчас', category: 'popular' },
  { slug: 'самые-ожидаемые-премьеры', title: 'Самые ожидаемые премьеры', category: 'upcoming' },
  {
    slug: 'топ-рейтинговые-фильмы-за-все-время',
    title: 'Топ рейтинговые фильмы за все время',
    category: 'top-rated'
  }
] as const satisfies readonly IMovieCategoryConfig[]

export type TMovieCategoryConfig = (typeof MOVIE_CATEGORIES)[number]
export type TMovieCategorySlug = TMovieCategoryConfig['slug']

/** Прежние адреса подборок → нынешние: ссылки из закладок и истории не ведут на «не найдено». */
const RENAMED_CATEGORY_SLUGS = new Map<string, TMovieCategorySlug>([
  ['популярные-в-этом-месяце', 'популярные-сейчас']
])

export const getMovieCategoryPath = (slug: TMovieCategorySlug) => `/category/${slug}`

export const findMovieCategory = (slug: string): TMovieCategoryConfig | undefined =>
  MOVIE_CATEGORIES.find((item) => item.slug === slug)

export const getRenamedCategorySlug = (slug: string): TMovieCategorySlug | undefined =>
  RENAMED_CATEGORY_SLUGS.get(slug)
