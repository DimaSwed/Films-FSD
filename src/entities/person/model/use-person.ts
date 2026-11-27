import { skipToken, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { isNotFoundError } from '@/shared/api'
import { useNotification } from '@/shared/notifications'

import { personApi } from '../api'
import { transformPerson } from '../lib'

import type { IPersonDetails } from './person.types'

/** `null` — такого человека в TMDB нет (это ответ, а не сбой: без повтора и тоста). */
const fetchPerson = async (id: number): Promise<IPersonDetails | null> => {
  try {
    const { data } = await personApi.getById(id)
    return transformPerson(data)
  } catch (error) {
    if (isNotFoundError(error)) return null
    throw error
  }
}

/** Без `id` (в адресе не номер) запрос не уходит. */
export const usePerson = (id: number | undefined) => {
  const { errors } = useNotification()
  const result = useQuery({
    queryKey: ['person', id],
    queryFn: id === undefined ? skipToken : () => fetchPerson(id),
    staleTime: 86400 * 1000
  })
  useEffect(() => {
    if (result.isError) errors('Ошибка загрузки страницы человека')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isError])
  return result
}
