import { useQuery } from '@tanstack/react-query'
import { userApi } from '@/features/user/api'
import { useSessionId } from '@/features/auth/hooks'

export const useUserDetails = () => {
  const sessionId = useSessionId()

  return useQuery({
    queryKey: ['user-details', sessionId],
    queryFn: () => {
      if (!sessionId) throw new Error('No session ID')
      return userApi.getUserDetails(sessionId)
    },
    enabled: !!sessionId,
    staleTime: 1000 * 60 * 5
  })
}
