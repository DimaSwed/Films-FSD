import { api } from '@/shared/api/tmdb'
import {
  // ICreateSessionRequest,
  ICreateSessionResponse,
  IRequestTokenResponse
} from '@/features/auth/types'

export const authApi = {
  createRequestToken: async () => {
    const response = await api.get<IRequestTokenResponse>('/authentication/token/new')
    return response.data
  },

  createSessionId: async (requestToken: string) => {
    const response = await api.post<ICreateSessionResponse>('/authentication/session/new', {
      request_token: requestToken
    })
    return response.data
  }
}
