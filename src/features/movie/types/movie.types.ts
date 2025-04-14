export interface IMovieDetails {
  id: number
  title: string
  rating: number
  image: string
  backgroundImage: string
  releaseDate: string
  genre: string
  year: number
  duration: number
  description: string
  genres: { id: number; name: string }[]
}

export interface IApiMovieResponse {
  id: number
  title: string
  vote_average: number
  poster_path: string
  backdrop_path: string
  release_date: string
  runtime: number | null
  overview: string
  genres: { id: number; name: string }[]
}
