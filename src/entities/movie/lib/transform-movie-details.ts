import { getTmdbImageUrl } from '@/shared/lib'

import type { IMovieDetails, IApiMovieResponse } from '../model'

export const transformMovieDetails = (data: IApiMovieResponse): IMovieDetails => {
  return {
    id: data.id,
    title: data.title,
    rating: data.vote_average,
    image: getTmdbImageUrl(data.poster_path),
    backgroundImage: getTmdbImageUrl(data.backdrop_path, 'original'),
    releaseDate: data.release_date,
    genre: data.genres.map((genre) => genre.name).join(', '),
    genres: data.genres,
    year: new Date(data.release_date).getFullYear(),
    duration: data.runtime ?? 0,
    description: data.overview
  }
}
