import { useMutation } from '@tanstack/react-query'
import { api } from '@/shared/api/tmdb/api-client'
import { GENRES_MAP } from '@/shared/constants/constants'
import { IMovie } from '@/shared/types/common.types'
import { IMoviesResponseData } from '@/features/search-movie/types/search.types'

export const useSearchMovies = () => {
  return useMutation<IMoviesResponseData, Error, string>({
    mutationFn: async (query: string) => {
      const res = await api.get('/search/movie', {
        params: {
          query,
          page: 1,
          language: 'ru-RU',
          region: 'RU'
        }
      })

      return {
        docs: res.data.results.map((movie: IMovie) => ({
          id: movie.id,
          title: movie.title,
          rating: movie.vote_average,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          year: movie.release_date ? new Date(movie.release_date).getFullYear() : 0,
          genre: (movie.genre_ids ?? []).map((id: number) => GENRES_MAP[id]).join(', '),
          duration: movie.runtime ?? 0
        })),
        page: res.data.page,
        limit: res.data.total_pages
      }
    }
  })
}
