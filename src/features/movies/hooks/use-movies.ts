// src/features/movies/hooks/use-movies.ts
import { useQuery } from '@tanstack/react-query'
import { moviesApi } from '@/features/movies/api/movies-api'

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
    //   const response = await moviesApi.getUpcoming()
    //   return transformMovies(response)
    // },
    queryFn: moviesApi.getUpcoming,
    staleTime: 86400 * 1000 // 24 часа
  })
}

export const useTopRatedMovies = () => {
  return useQuery({
    queryKey: ['movies', 'top-rated'],
    // queryFn: async () => {
    //   const response = await moviesApi.getTopRated()
    //   return transformMovies(response)
    // },
    queryFn: moviesApi.getTopRated,
    staleTime: 86400 * 1000
  })
}

export const useTrendingMovies = () => {
  return useQuery({
    queryKey: ['movies', 'trending'],
    // queryFn: async () => {
    //   const response = await moviesApi.getTrending()
    //   return transformMovies(response)
    // },
    queryFn: moviesApi.getTrending,
    staleTime: 86400 * 1000
  })
}

export const useNowPlayingMovies = () => {
  return useQuery({
    queryKey: ['movies', 'now-playing'],
    // queryFn: async () => {
    //   const response = await moviesApi.getNowPlaying()
    //   return transformMovies(response)
    // },
    queryFn: moviesApi.getNowPlaying,
    staleTime: 86400 * 1000
  })
}

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ['movies', 'popular'],
    // queryFn: async () => {
    //   const response = await moviesApi.getPopular()
    //   return transformMovies(response)
    // },
    queryFn: moviesApi.getPopular,
    staleTime: 86400 * 1000
  })
}
