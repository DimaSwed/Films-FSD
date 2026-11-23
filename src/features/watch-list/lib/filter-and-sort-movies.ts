import { applyMovieListView, IMovie, isAddedOrder, TMovieSort } from '@/shared/lib'

import { WATCHLIST_SOURCE_ORDER } from '../api'

interface IWatchListFilters {
  genre: string
  year: string
  query: string
  sort: TMovieSort
}

const matchesYear = (movie: IMovie, year: string) => {
  if (year === 'до 1980') return movie.year < 1980

  if (year.includes('-')) {
    const [start, end] = year.split('-').map(Number)
    return movie.year >= start && movie.year <= end
  }

  return movie.year === Number(year)
}

/**
 * Фильтрует и сортирует список «К просмотру», исходный массив не меняет.
 * Для сортировок по дате добавления порядок берётся из самого списка: если TMDB отдаёт его
 * не в том направлении, какое выбрал пользователь, список переворачивается.
 */
export const filterAndSortMovies = (
  movies: IMovie[],
  { genre, year, query, sort }: IWatchListFilters
) => {
  const sourceIsAscending = WATCHLIST_SOURCE_ORDER === 'created_at.asc'
  const wantsAscending = sort === 'added-asc'
  const needsReverse = isAddedOrder(sort) && sourceIsAscending !== wantsAscending
  const ordered = needsReverse ? [...movies].reverse() : movies
  const filtered = ordered
    .filter((movie) => !genre || movie.genre?.includes(genre))
    .filter((movie) => !year || matchesYear(movie, year))

  return applyMovieListView(filtered, { query, sort })
}
