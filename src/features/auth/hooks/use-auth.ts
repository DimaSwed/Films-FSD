import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/features/auth/api/auth-api'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const createRequestToken = useMutation({
    mutationFn: authApi.createRequestToken,
    onSuccess: (data) => {
      if (data.request_token) {
        const redirectUrl = `${window.location.origin}`
        window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=${redirectUrl}`
      }
    }
  })

  const createSessionId = useMutation({
    mutationFn: (requestToken: string) => authApi.createSessionId(requestToken),
    onSuccess: (data) => {
      if (data.session_id) {
        Cookies.set('session_id', data.session_id, { expires: 7 })
        queryClient.invalidateQueries({ queryKey: ['auth-status'] })
        navigate('/', { replace: true })
      }
    }
  })

  const logout = () => {
    Cookies.remove('session_id')
    queryClient.invalidateQueries({ queryKey: ['auth-status'] })
    navigate('/', { replace: true })
  }

  return {
    createRequestToken,
    createSessionId,
    logout
  }
}
