import { getReleaseYear, getTmdbImageUrl, transformMovie, uniqueMovies } from '@/shared/lib'

import type {
  IApiMovieResponse,
  ICastMember,
  ICreditsRaw,
  IMovieDetails,
  IPersonLink
} from '../model'

import { getCountryName } from './get-country-name'
import { getRussianRelease } from './get-russian-release'
import { pickMovieTrailer } from './pick-movie-trailer'

/** TMDB отдаёт до сотни актёров по значимости; на странице нужны главные. */
const MAX_CAST = 20

const getCast = (credits?: ICreditsRaw): ICastMember[] =>
  (credits?.cast ?? []).slice(0, MAX_CAST).map((person) => ({
    id: person.id,
    creditId: person.credit_id,
    name: person.name,
    character: person.character ?? '',
    photo: getTmdbImageUrl(person.profile_path, 'w185')
  }))

/** В `crew` один человек может встретиться с должностью `Director` не один раз — оставляем по разу. */
const getDirectors = (credits?: ICreditsRaw): IPersonLink[] => {
  const directors = (credits?.crew ?? []).filter(({ job }) => job === 'Director')
  return [...new Map(directors.map(({ id, name }) => [id, { id, name }])).values()]
}

export const transformMovieDetails = (data: IApiMovieResponse): IMovieDetails => {
  const russianRelease = getRussianRelease(data.release_dates?.results)

  return {
    id: data.id,
    title: data.title,
    tagline: data.tagline ?? '',
    rating: data.vote_average,
    voteCount: data.vote_count,
    image: getTmdbImageUrl(data.poster_path),
    backgroundImage: getTmdbImageUrl(data.backdrop_path, 'w1280'),
    releaseDate: data.release_date,
    releaseDateRu: russianRelease.date,
    ageRating: russianRelease.ageRating,
    genre: data.genres.map((genre) => genre.name).join(', '),
    year: getReleaseYear(data.release_date),
    duration: data.runtime ?? 0,
    description: data.overview,
    countries: (data.production_countries ?? []).map(getCountryName),
    budget: data.budget,
    directors: getDirectors(data.credits),
    cast: getCast(data.credits),
    trailer: pickMovieTrailer(data.videos?.results),
    recommendations: uniqueMovies((data.recommendations?.results ?? []).map(transformMovie))
  }
}
