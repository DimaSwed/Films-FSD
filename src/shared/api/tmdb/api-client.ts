import axios, { AxiosError } from 'axios'
import { ITMDBError } from '@/shared/types'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json'
  },
  params: {
    api_key: API_KEY
  }
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ITMDBError>) => {
    if (error.response) {
      const tmdbError = error.response.data
      error.message = `TMDB Error ${tmdbError.status_code}: ${tmdbError.status_message}`
    }
    return Promise.reject(error)
  }
)
