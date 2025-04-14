import { useQuery } from '@tanstack/react-query'
import { userApi } from '@/features/user/api'
import { useSessionId } from '@/features/auth/hooks'
import { IApiError } from '@/shared/types/types'
import { IUserDetails } from '../types/types'

export const useUserDetails = () => {
  const sessionId = useSessionId()

  return useQuery<IUserDetails, Error>({
    queryKey: ['user-details', sessionId],
    queryFn: async () => {
      if (!sessionId) {
        const error: IApiError = new Error('Session ID is required')
        throw error
      }

      try {
        const response = await userApi.getUserDetails(sessionId)
        return response
      } catch (error) {
        const apiError = error as IApiError
        if (apiError.response?.data?.status_code === 3) {
          const sessionError: IApiError = new Error('Session ID not valid')
          sessionError.response = apiError.response
          throw sessionError
        }
        throw error
      }
    },
    enabled: !!sessionId,
    staleTime: 1000 * 60 * 5, // 5 минут
    retry: (failureCount, error: IApiError) => {
      if (error.message.includes('Session ID not valid')) {
        return false
      }
      return failureCount < 3
    }
  })
}
