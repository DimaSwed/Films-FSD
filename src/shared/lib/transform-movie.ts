import { genreMap } from '../config'

import { IMovieRaw, IMovie } from './common.types'
import { getReleaseYear } from './get-release-year'
import { getTmdbImageUrl } from './tmdb-image'

export const transformMovie = (raw: IMovieRaw): IMovie => ({
  id: raw.id,
  title: raw.title,
  rating: raw.vote_average,
  image: getTmdbImageUrl(raw.poster_path),
  backdrop: getTmdbImageUrl(raw.backdrop_path, 'w300'),
  year: getReleaseYear(raw.release_date),
  // Жанров, которых нет в GENRES_LIST (например, «Документальный», id 99), не показываем: иначе
  // первым в списке стояло бы «Неизвестно». Если не нашлось ни одного, строка пустая.
  genre: (raw.genre_ids ?? [])
    .map((id) => genreMap[id])
    .filter(Boolean)
    .join(', '),
  duration: raw.runtime ?? 0,
  description: raw.overview,
  releaseDate: raw.release_date,
  userRating: raw.rating
})
