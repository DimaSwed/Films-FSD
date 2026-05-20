import { useUserDetails } from '@/features/user/hooks'
import { useSearchParams } from 'react-router-dom'
import { useAuth, useSessionId } from '@/features/auth'
import { Box, Typography, Avatar, Stack, Button } from '@mui/material'
import { LoadingErrorState } from '@/shared/ui'
import { useEffect } from 'react'

export const ProfilePage = () => {
  const { data: user, isLoading, isError } = useUserDetails()
  const { createRequestToken, createSessionId, logout } = useAuth()
  const sessionId = useSessionId()

  const [searchParams] = useSearchParams()
  const requestToken = searchParams.get('request_token')
  const approved = searchParams.get('approved')

  useEffect(() => {
    if (approved === 'true' && requestToken) {
      createSessionId.mutate(requestToken)
    }
  }, [approved, requestToken, createSessionId])

  const handleLogin = () => {
    createRequestToken.mutate()
  }

  if (!sessionId) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // justifyContent: 'center',
          gap: 2,
          margin: '10px auto'
        }}
      >
        <Typography variant="h5" color="text.primary" textAlign={'center'}>
          Для просмотра профиля необходимо авторизоваться
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={handleLogin} sx={{ color: 'primary.contrastText' }}>
            Войти
          </Button>

          <Button
            variant="contained"
            component="a"
            href="https://www.themoviedb.org/signup"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'primary.contrastText' }}
          >
            Регистрация
          </Button>
        </Box>
      </Box>
    )
  }

  if (isLoading || isError) {
    return (
      <LoadingErrorState
        isLoading={isLoading}
        isError={isError}
        loadingText="Загружаем профиль..."
        errorTitle="Ошибка загрузки профиля"
        errorDescription="Не удалось загрузить данные профиля. Попробуйте позже."
      />
    )
  }

  if (!user) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', width: '100%' }}>
        <Typography variant="h6" color="text.primary" textAlign={'center'}>
          Пользователь не найден
        </Typography>
      </Box>
    )
  }

  return (
    <Stack
      sx={{
        padding: { xs: '10px', sm: '15px', md: '30px' },
        color: 'secondary.contrastText',
        bgcolor: 'background.paper',
        width: '100%'
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4, width: '100%' }}>
        {user.avatar?.gravatar?.hash ? (
          <Avatar
            src={`https://www.gravatar.com/avatar/${user.avatar.gravatar.hash}`}
            alt={`${user.name}'s avatar`}
            sx={{
              margin: '0 auto 10px auto',
              width: 90,
              height: 90
            }}
          />
        ) : (
          <Avatar
            src="/avatar.png"
            alt="User Avatar"
            sx={{ width: 100, height: 100, mx: 'auto', mb: '5px' }}
          />
        )}
        <Typography variant="h4">{user.name || 'Неизвестно'}</Typography>
        <Typography variant="body1" color="secondary.contrastText">
          ID пользователя: {user.id}
        </Typography>
        {user.email && <Typography variant="body2">{user.email}</Typography>}
        <Typography variant="body2" mb={1}>
          Авторизация с помощью: {user.avatar?.tmdb?.avatar_path == null ? 'TMDB' : ''}
        </Typography>
        <Typography variant="body2" mb={1}>
          Язык: {user.iso_639_1}
        </Typography>
        <Typography variant="body2" mb={1}>
          Страна: {user.iso_3166_1}
        </Typography>
        <Typography variant="body2" mb={1}>
          Имя пользователя: {user.username}
        </Typography>
        <Typography variant="body2" color="secondary.contrastText">
          0 Подписчиков • 0 Подписок
        </Typography>
        <Button variant="contained" onClick={logout} sx={{ mt: 2 }}>
          Выйти
        </Button>
      </Box>
    </Stack>
  )
}
