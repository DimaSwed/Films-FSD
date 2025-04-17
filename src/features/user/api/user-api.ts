import { api } from '@/shared/api/tmdb'
import { IUserDetails } from '@/features/user'

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
