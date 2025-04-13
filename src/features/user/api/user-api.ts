import { api } from '@/shared/api/tmdb/api-client'
import { IUserDetails } from '@/features/user/types/types'

export const userApi = {
  getUserDetails: async (sessionId: string) => {
    const response = await api.get<IUserDetails>('/account', {
      params: { session_id: sessionId }
    })
    return response.data
  }
}
