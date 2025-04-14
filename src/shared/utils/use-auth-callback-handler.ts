import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth'

export const useAuthCallbackHandler = () => {
  const [params, setParams] = useSearchParams()
  const { createSessionId } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const token = params.get('request_token')
    const approved = params.get('approved')

    if (token && approved === 'true') {
      createSessionId.mutate(token)
      setParams({})
    } else if (approved === 'false') {
      navigate('/', { replace: true })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
