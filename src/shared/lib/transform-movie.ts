import { IMovieRaw, IMovie } from '@/shared/types'
import { genreMap } from '@/shared/constants'

const IMAGE_BASE_URL =
  (import.meta.env.VITE_IMAGE_BASE_URL as string) || 'https://image.tmdb.org/t/p/w500'

export const transformMovie = (raw: IMovieRaw): IMovie => ({
  id: raw.id,
  title: raw.title,
  rating: raw.vote_average,
  image: raw.poster_path ? `${IMAGE_BASE_URL}${raw.poster_path}` : '',
  year: raw.release_date ? new Date(raw.release_date).getFullYear() : 0,
  genre: (raw.genre_ids ?? []).map((id) => genreMap[id] || 'Неизвестно').join(', '),
  duration: raw.runtime ?? 0,
  description: raw.overview,
  releaseDate: raw.release_date
})
