import { genreMap } from '../config'

import { IMovieRaw, IMovie } from './common.types'
import { getTmdbImageUrl } from './tmdb-image'

export const transformMovie = (raw: IMovieRaw): IMovie => ({
  id: raw.id,
  title: raw.title,
  rating: raw.vote_average,
  image: getTmdbImageUrl(raw.poster_path),
  year: raw.release_date ? new Date(raw.release_date).getFullYear() : 0,
  genre: (raw.genre_ids ?? []).map((id) => genreMap[id] || 'Неизвестно').join(', '),
  duration: raw.runtime ?? 0,
  description: raw.overview,
  releaseDate: raw.release_date
})
