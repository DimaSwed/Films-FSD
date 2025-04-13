import axios from 'axios'

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
