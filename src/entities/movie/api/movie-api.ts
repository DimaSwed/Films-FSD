import { api } from '@/shared/api'

import type {
  IAccountState,
  IApiMovieResponse,
  IMovieVideosResponse,
  IWatchProvidersResponse
} from '../model'

/** Без таймаута карточка с зависшим запросом осталась бы скелетоном на минуты. */
const VIDEOS_TIMEOUT_MS = 8000

export const movieApi = {
  getById: (id: number) => api.get<IApiMovieResponse>(`/movie/${id}?language=ru-RU`),
  getWatchProviders: (id: number) =>
    api.get<IWatchProvidersResponse>(`/movie/${id}/watch/providers`),
  // Без include_video_language TMDB отдаёт только ролики на языке запроса: русский трейлер есть
  // у меньшинства новинок, поэтому берём ещё английские и ролики без языка.
  getVideos: (id: number) =>
    api.get<IMovieVideosResponse>(`/movie/${id}/videos`, {
      params: { language: 'ru-RU', include_video_language: 'ru,en,null' },
      timeout: VIDEOS_TIMEOUT_MS
    }),
  getAccountStates: async (id: number, sessionId: string): Promise<IAccountState> => {
    const response = await api.get<IAccountState>(`/movie/${id}/account_states`, {
      params: { session_id: sessionId }
    })
    return response.data
  }
}
