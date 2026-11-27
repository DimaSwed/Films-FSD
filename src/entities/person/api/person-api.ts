import { api } from '@/shared/api'
import { TMDB_LANGUAGE } from '@/shared/config'

import type { IPersonRaw } from '../model'

export const personApi = {
  // Человек и вся его фильмография одним запросом
  getById: (id: number) =>
    api.get<IPersonRaw>(`/person/${id}`, {
      params: { language: TMDB_LANGUAGE, append_to_response: 'movie_credits' }
    })
}
