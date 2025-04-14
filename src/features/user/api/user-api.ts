import { api } from '@/shared/api/tmdb/api-client'
import { IUserDetails } from '@/features/user/types/user.types'

export const userApi = {
  getUserDetails: async (sessionId: string): Promise<IUserDetails> => {
    const response = await api.get<IUserDetails>('/account', {
      params: { session_id: sessionId }
    })
    if (!response.data) {
      throw new Error('User details not found')
    }
    return response.data
  }
}
