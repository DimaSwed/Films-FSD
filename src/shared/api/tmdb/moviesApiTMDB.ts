// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// // Получаем ACCOUNT_ID ключ из переменных окружения
// // const API = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH as string
// const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY as string

// // Создаем API с использованием RTK Query
// export const moviesApi = createApi({
//   reducerPath: 'moviesApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://api.themoviedb.org/3',
//     prepareHeaders: (headers) => {
//       if (API_KEY) {
//         headers.set('Authorization', `Bearer ${API_KEY}`)
//       }
//       headers.set('Content-Type', 'application/json')
//       return headers
//     }
//   }),
//   endpoints: (builder) => ({
//     fetchUpcomingMovies: builder.query<Movie[], void>({
//       query: () => ({
//         url: '/movie/upcoming',
//         params: { language: 'ru-RU', page: '1', region: 'RU', api_key: API_KEY }
//       }),
//       transformResponse: (response: { results: any[] }) =>
//         response.results.map((movie: any) => ({
//           id: movie.id,
//           title: movie.title,
//           rating: movie.vote_average,
//           image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//           year: new Date(movie.release_date).getFullYear(),
//           genre: movie.genre_ids.map((id: number) => genreMap[id]).join(', '),
//           duration: movie.runtime ?? 0
//         })),
//       keepUnusedDataFor: 86400
//     }),

//     fetchTopRatedMovies: builder.query<Movie[], void>({
//       query: () => ({
//         url: '/movie/top_rated',
//         params: { language: 'ru-RU', page: '1', region: 'RU', api_key: API_KEY }
//       }),
//       transformResponse: (response: { results: any[] }) =>
//         response.results.map((movie: any) => ({
//           id: movie.id,
//           title: movie.title,
//           rating: movie.vote_average,
//           image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//           year: new Date(movie.release_date).getFullYear(),
//           genre: movie.genre_ids.map((id: number) => genreMap[id]).join(', '),
//           duration: movie.runtime ?? 0
//         })),
//       keepUnusedDataFor: 86400
//     }),

//     fetchTrendingMovies: builder.query<Movie[], void>({
//       query: () => ({
//         url: '/trending/movie/week',
//         params: { language: 'ru-RU', api_key: API_KEY }
//       }),
//       transformResponse: (response: { results: any[] }) =>
//         response.results.map((movie: any) => ({
//           id: movie.id,
//           title: movie.title,
//           rating: movie.vote_average,
//           image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//           year: new Date(movie.release_date).getFullYear(),
//           genre: movie.genre_ids.map((id: number) => genreMap[id]).join(', '),
//           duration: movie.runtime ?? 0
//         })),
//       keepUnusedDataFor: 86400
//     }),

//     fetchNowPlayingMovies: builder.query<Movie[], void>({
//       query: () => ({
//         url: '/movie/now_playing',
//         params: { language: 'ru-RU', page: '1', region: 'RU', api_key: API_KEY }
//       }),
//       transformResponse: (response: { results: any[] }) =>
//         response.results.map((movie: any) => ({
//           id: movie.id,
//           title: movie.title,
//           rating: movie.vote_average,
//           image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//           year: new Date(movie.release_date).getFullYear(),
//           genre: movie.genre_ids.map((id: number) => genreMap[id]).join(', '),
//           duration: movie.runtime ?? 0
//         })),
//       keepUnusedDataFor: 86400
//     }),

//     fetchPopularMovies: builder.query<Movie[], void>({
//       query: () => ({
//         url: '/movie/popular',
//         params: { language: 'ru-RU', page: '1', region: 'RU', api_key: API_KEY }
//       }),
//       transformResponse: (response: { results: any[] }) =>
//         response.results.map((movie: any) => ({
//           id: movie.id,
//           title: movie.title,
//           rating: movie.vote_average,
//           image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//           year: new Date(movie.release_date).getFullYear(),
//           genre: movie.genre_ids.map((id: number) => genreMap[id]).join(', '),
//           duration: movie.runtime ?? 0
//         })),
//       keepUnusedDataFor: 86400
//     })
//   })
// })

// // Экспортируем автоматически сгенерированные хуки для каждого эндпоинта
// export const {
//   useFetchUpcomingMoviesQuery,
//   useFetchTopRatedMoviesQuery,
//   useFetchPopularMoviesQuery,
//   useFetchNowPlayingMoviesQuery,
//   useFetchTrendingMoviesQuery
// } = moviesApi
