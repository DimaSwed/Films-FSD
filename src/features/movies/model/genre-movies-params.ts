import { IMoviesFilters } from './movies.types'

/** Параметры выборки «популярное в жанре» — общие для карусели на /movies и страницы /genre/:id (номер страницы добавляет запрос). */
export const getGenreMoviesParams = (genreId: number): IMoviesFilters => ({
  include_adult: 'true',
  include_video: 'true',
  sort_by: 'popularity.desc',
  with_genres: genreId
})
