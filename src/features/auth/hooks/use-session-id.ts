import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

export const useSessionId = () => {
  return useQuery({
    queryKey: ['session-id'],
    queryFn: () => Cookies.get('session_id') || null,
    enabled: typeof window !== 'undefined',
    select: (value) => value
    // initialData: () => Cookies.get('session_id') || null
  }).data
}
