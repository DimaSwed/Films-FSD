// src/features/auth/hooks/use-auth-status.ts
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

export const useAuthStatus = () => {
  return useQuery({
    queryKey: ['auth-status'],
    queryFn: () => {
      const sessionId = Cookies.get('session_id')
      return !!sessionId
    },
    initialData: false
  })
}
