import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/features/auth'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useNotification } from '@/shared/notifications'
import { SESSION_CHANGE_EVENT } from '@/features/auth/hooks/use-session-id'

// Время, чтобы успеть прочитать подсказку перед уходом на сайт TMDB
const TMDB_REDIRECT_DELAY_MS = 1500

export const useAuth = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { success, errors, info } = useNotification()

  const createRequestToken = useMutation({
    mutationFn: authApi.createRequestToken,
    onSuccess: (data) => {
      if (data.request_token) {
        const redirectUrl = `${window.location.origin}`
        info(
          'Открываем сайт TMDB для входа. Если он не загружается, включите VPN: он нужен только на этом шаге'
        )
        window.setTimeout(() => {
          window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=${redirectUrl}`
        }, TMDB_REDIRECT_DELAY_MS)
      }
    },
    onError: () => {
      errors('Ошибка при создании токена авторизации')
    }
  })

  const createSessionId = useMutation({
    mutationFn: (requestToken: string) => authApi.createSessionId(requestToken),
    onSuccess: (data) => {
      if (data.session_id) {
        Cookies.set('session_id', data.session_id, { expires: 7 })
        window.dispatchEvent(new Event(SESSION_CHANGE_EVENT))
        queryClient.invalidateQueries({ queryKey: ['user-details'] })
        success('Авторизация прошла успешно')
      }
    },
    onError: () => {
      errors('Ошибка при авторизации')
    }
  })

  const logout = () => {
    Cookies.remove('session_id')
    window.dispatchEvent(new Event(SESSION_CHANGE_EVENT))
    queryClient.invalidateQueries({ queryKey: ['user-details'] })
    navigate('/')
    success('Вы успешно вышли из аккаунта')
  }

  return {
    createRequestToken,
    createSessionId,
    logout
  }
}
