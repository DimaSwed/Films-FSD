import { skipToken, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { isNotFoundError } from '@/shared/api'
import { useNotification } from '@/shared/notifications'

import { movieApi } from '../api'
import { transformMovieDetails } from '../lib'

import { IMovieDetails } from './movie.types'

/** Фильм целиком; `null` — такого фильма в TMDB нет (это ответ, а не сбой: без повтора и тоста). */
const fetchMovie = async (id: number): Promise<IMovieDetails | null> => {
  try {
    const { data } = await movieApi.getById(id)
    return transformMovieDetails(data)
  } catch (error) {
    if (isNotFoundError(error)) return null
    throw error
  }
}

/** Без `id` (в адресе не номер фильма) запрос не уходит. */
export const useMovie = (id: number | undefined) => {
  const { errors } = useNotification()
  const result = useQuery({
    queryKey: ['movie', id],
    queryFn: id === undefined ? skipToken : () => fetchMovie(id),
    staleTime: 86400 * 1000
  })
  useEffect(() => {
    if (result.isError) errors('Ошибка загрузки фильма')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isError])
  return result
}
