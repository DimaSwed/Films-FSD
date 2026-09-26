import { api } from '@/shared/api'
import type { IUserDetails } from '../model'

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
