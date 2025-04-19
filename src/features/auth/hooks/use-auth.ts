import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/features/auth'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useSnackbar } from 'notistack'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

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
        queryClient.invalidateQueries({ queryKey: ['session-id'] })
        queryClient.invalidateQueries({ queryKey: ['user-details'] })
        enqueueSnackbar('Авторизация прошла успешно', { variant: 'success' })
        // navigate('/profile')
      }
    }
  })

  const logout = () => {
    Cookies.remove('session_id')
    queryClient.invalidateQueries({ queryKey: ['session-id'] })
    queryClient.invalidateQueries({ queryKey: ['user-details'] })
    navigate('/')
    enqueueSnackbar('Вы успешно вышли из аккаунта', { variant: 'success' })
  }

  return {
    createRequestToken,
    createSessionId,
    logout
  }
}
