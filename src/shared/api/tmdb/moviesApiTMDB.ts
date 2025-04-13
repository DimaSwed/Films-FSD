import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Получаем ACCOUNT_ID ключ из переменных окружения
// const API = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH as string
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY as string

// Создаем API с использованием RTK Query
export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    prepareHeaders: (headers) => {
      if (API_KEY) {
        headers.set('Authorization', `Bearer ${API_KEY}`)
      }
      headers.set('Content-Type', 'application/json')
      return headers
    }
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: (sessionId: string) => ({
        url: `/account`,
        method: 'GET',
        params: { api_key: API_KEY, session_id: sessionId }
      })
    })
  })
})

// Экспортируем автоматически сгенерированные хуки для каждого эндпоинта
export const { useGetUserDetailsQuery } = moviesApi
