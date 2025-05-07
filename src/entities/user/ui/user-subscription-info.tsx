import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertTitle, Box, Button, CircularProgress, Typography } from '@mui/material'

import { useAuth } from '@/features/auth'
import { useUserDetails } from '@/features/user'
import { IApiError } from '@/shared/types'
import avatar from '@/shared/assets/images/avatar.png'

export const UserSubscriptionInfo: FC = () => {
  const { data: user, isLoading, error, refetch } = useUserDetails()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const apiError = error as IApiError | undefined

  const isSessionExpired =
    apiError?.message?.includes('Session ID not valid') ||
    apiError?.response?.data?.status_code === 3

  const handleRefresh = () => {
    refetch()
  }

  const handleLogoutAndRedirect = () => {
    logout()
    navigate('/', { replace: true })
  }

  if (isLoading) {
    return (
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <CircularProgress sx={{ color: 'primary.light', m: 2 }} />
      </Typography>
    )
  }

  if (isSessionExpired) {
    return (
      <Alert
        severity="error"
        sx={{ mb: 2 }}
        action={
          <Button color="inherit" size="small" onClick={handleLogoutAndRedirect}>
            Войти
          </Button>
        }
      >
        <AlertTitle>Сессия истекла</AlertTitle>
        Пожалуйста, войдите снова
      </Alert>
    )
  }

  if (error) {
    return (
      <Alert
        severity="error"
        sx={{ maxWidth: 'fit-content', margin: '0 auto', mb: 2 }}
        action={
          <Button color="inherit" size="small" onClick={handleRefresh}>
            Повторить
          </Button>
        }
      >
        <AlertTitle>Ошибка загрузки</AlertTitle>
        {apiError?.message || 'Не удалось загрузить данные пользователя'}
      </Alert>
    )
  }

  if (!user) {
    return null
  }

  return (
    <Box
      sx={{
        padding: '10px',
        textAlign: 'center',
        color: 'text.primary',
        maxWidth: 'fit-content',
        margin: '0 auto'
      }}
    >
      {user.avatar?.tmdb?.avatar_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${user.avatar.tmdb.avatar_path}`}
          alt="avatar"
          width="90"
          height="95"
          style={{ margin: '0 auto 10px auto', borderRadius: '50%' }}
        />
      ) : (
        <img
          src={avatar}
          alt="default avatar"
          width="90"
          height="95"
          style={{ margin: '0 auto 10px auto', borderRadius: '50%' }}
        />
      )}

      <Typography variant="body1" mb={1}>
        {user.username}
      </Typography>
      <Typography variant="body2" mb={1}>
        ID: {user.id}
      </Typography>
      {user.email && (
        <Typography variant="body2" mb={1}>
          {user.email}
        </Typography>
      )}
      {/* <Typography variant="body2">Авторизация с помощью :</Typography> */}
      {/* <Typography variant="h6" mb={1}>
        Название подписки
      </Typography>
      <Typography variant="body2" mb={1}>
        Разблокировать все функции. Поддержка КиноТрекер.
      </Typography>
      <Button
        variant="contained"
        sx={{ textTransform: 'uppercase', bgcolor: 'primary.light', borderRadius: '20px' }}
      >
        Попробовать бесплатно
      </Button> */}
      <Button variant="contained" size="small" onClick={logout} sx={{ mt: 1 }}>
        Выйти
      </Button>
    </Box>
  )
}
