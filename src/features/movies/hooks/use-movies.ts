// src/features/movies/hooks/use-movies.ts
import { useQuery } from '@tanstack/react-query'
import { movieApi } from '@/features/movies/api/movie-api'

// const transformMovies = (data: any): IMovie[] => {
//   if (!data || !data.results) {
//     return []
//   }

//   return data.results.map((movie: any) => ({
//     id: movie.id,
//     title: movie.title,
//     rating: movie.vote_average,
//     image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//     year: new Date(movie.release_date).getFullYear(),
//     genre: movie.genre_ids?.join(', ') || '',
//     duration: movie.runtime ?? 0
//   }))
// }

export const useUpcomingMovies = () => {
  return useQuery({
    queryKey: ['movies', 'upcoming'],
    // queryFn: async () => {
    //   const response = await movieApi.getUpcoming()
    //   return transformMovies(response)
    // },
    queryFn: movieApi.getUpcoming,
    staleTime: 86400 * 1000 // 24 часа
  })
}

export const useTopRatedMovies = () => {
  return useQuery({
    queryKey: ['movies', 'top-rated'],
    // queryFn: async () => {
    //   const response = await movieApi.getTopRated()
    //   return transformMovies(response)
    // },
    queryFn: movieApi.getTopRated,
    staleTime: 86400 * 1000
  })
}

export const useTrendingMovies = () => {
  return useQuery({
    queryKey: ['movies', 'trending'],
    // queryFn: async () => {
    //   const response = await movieApi.getTrending()
    //   return transformMovies(response)
    // },
    queryFn: movieApi.getTrending,
    staleTime: 86400 * 1000
  })
}

export const useNowPlayingMovies = () => {
  return useQuery({
    queryKey: ['movies', 'now-playing'],
    // queryFn: async () => {
    //   const response = await movieApi.getNowPlaying()
    //   return transformMovies(response)
    // },
    queryFn: movieApi.getNowPlaying,
    staleTime: 86400 * 1000
  })
}

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ['movies', 'popular'],
    // queryFn: async () => {
    //   const response = await movieApi.getPopular()
    //   return transformMovies(response)
    // },
    queryFn: movieApi.getPopular,
    staleTime: 86400 * 1000
  })
}
