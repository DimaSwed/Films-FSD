import { IMovie } from '@/shared/types'

interface IWatchListFilters {
  genre: string
  year: string
}

const matchesYear = (movie: IMovie, year: string) => {
  if (year === 'до 1980') return movie.year < 1980

  if (year.includes('-')) {
    const [start, end] = year.split('-').map(Number)
    return movie.year >= start && movie.year <= end
  }

  return movie.year === Number(year)
}

/** Возвращает новый массив: исходный (кэш React Query) не мутируется. Новые релизы — первыми. */
export const filterAndSortMovies = (movies: IMovie[], { genre, year }: IWatchListFilters) =>
  movies
    .filter((movie) => !genre || movie.genre?.includes(genre))
    .filter((movie) => !year || matchesYear(movie, year))
    .sort((a, b) => {
      if (!a.releaseDate) return 1
      if (!b.releaseDate) return -1
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    })
