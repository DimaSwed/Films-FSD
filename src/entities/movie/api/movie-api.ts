import { api } from '@/shared/api'
import { TMDB_LANGUAGE } from '@/shared/config'

import type {
  IAccountState,
  IApiMovieResponse,
  IMovieVideosResponse,
  IWatchProvidersResponse
} from '../model'

/** Без таймаута карточка с зависшим запросом осталась бы скелетоном на минуты. */
const VIDEOS_TIMEOUT_MS = 8000

/**
 * Без include_video_language TMDB отдаёт только ролики на языке запроса: русский трейлер есть
 * у меньшинства новинок, поэтому берём ещё английские и ролики без языка.
 */
const VIDEO_LANGUAGE_PARAMS = { language: TMDB_LANGUAGE, include_video_language: 'ru,en,null' }

export const movieApi = {
  // Всё для страницы фильма одним запросом. `similar` не берём: по замеру выборка почти не связана
  // с фильмом и полна малоизвестных картин, `recommendations` заметно точнее.
  getById: (id: number) =>
    api.get<IApiMovieResponse>(`/movie/${id}`, {
      params: {
        ...VIDEO_LANGUAGE_PARAMS,
        append_to_response: 'videos,credits,recommendations,release_dates'
      }
    }),
  getWatchProviders: (id: number) =>
    api.get<IWatchProvidersResponse>(`/movie/${id}/watch/providers`),
  getVideos: (id: number) =>
    api.get<IMovieVideosResponse>(`/movie/${id}/videos`, {
      params: VIDEO_LANGUAGE_PARAMS,
      timeout: VIDEOS_TIMEOUT_MS
    }),
  getAccountStates: async (id: number, sessionId: string): Promise<IAccountState> => {
    const response = await api.get<IAccountState>(`/movie/${id}/account_states`, {
      params: { session_id: sessionId }
    })
    return response.data
  }
}
