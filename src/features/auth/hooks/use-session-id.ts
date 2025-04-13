import Cookies from 'js-cookie'

export const useSessionId = () => {
  return Cookies.get('session_id')
}
