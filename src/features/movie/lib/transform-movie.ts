import { IMovieDetails, IApiMovieResponse } from '@/features/movie'

export const transformMovieDetails = (data: IApiMovieResponse): IMovieDetails => {
  return {
    id: data.id,
    title: data.title,
    rating: data.vote_average,
    image: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
    backgroundImage: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
    releaseDate: data.release_date,
    genre: data.genres.map((genre) => genre.name).join(', '),
    genres: data.genres,
    year: new Date(data.release_date).getFullYear(),
    duration: data.runtime ?? 0,
    description: data.overview
  }
}
