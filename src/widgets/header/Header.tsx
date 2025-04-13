import { FC, useEffect } from 'react'
import { AppBar, Box, Button, CssBaseline, Stack, Typography } from '@mui/material'
import { Link, useSearchParams } from 'react-router-dom'

import { useAuth } from '@/features/auth/hooks/use-auth'
import { useAuthStatus } from '@/features/auth/hooks/use-auth-status'
import { ChangeThemeButton } from '@/features/theme'
import { SettingsButton } from '@/features/settings'
import { SearchMovieButton } from '@/features/search-movie/ui/search-movie-button'
import {
  appBarStyles,
  boxStyles,
  buttonContainerStyles,
  stackStyles
} from '@/widgets/header/styles/header.styles'

export const Header: FC = () => {
  const { createRequestToken, createSessionId, logout } = useAuth()
  const { data: isAuthenticated } = useAuthStatus()
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

  const handleLogout = () => {
    logout()
  }

  return (
    <Stack direction="row">
      <CssBaseline />
      <AppBar position="sticky" sx={appBarStyles}>
        <Box component={'div'} sx={boxStyles}>
          <Box component={'div'}>
            <Link
              to="/"
              style={{ display: 'flex', gap: 10, alignItems: 'center', textDecoration: 'none' }}
            >
              <img
                src="/images/logo.jpg"
                alt="logo"
                width="70"
                height="50"
                style={{ borderRadius: '20px' }}
              />
              <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold', color: 'white' }}>
                КиноТрекер
              </Typography>
            </Link>
          </Box>

          <Box component={'div'} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <ChangeThemeButton />
          </Box>

          <Box component={'div'} sx={buttonContainerStyles}>
            <Stack sx={{ flexDirection: 'row', display: { xs: 'none', sm: 'flex' } }}>
              {isAuthenticated ? (
                <Button onClick={handleLogout} sx={{ color: 'primary.contrastText' }}>
                  Выйти
                </Button>
              ) : (
                <>
                  <Button onClick={handleLogin} sx={{ color: 'primary.contrastText' }}>
                    Войти
                  </Button>
                  <Button sx={{ color: 'primary.contrastText' }}>Регистрация</Button>
                </>
              )}
            </Stack>
          </Box>
          <Stack sx={stackStyles}>
            <SearchMovieButton />
            <Link to="/settings">
              <SettingsButton />
            </Link>
          </Stack>
        </Box>
      </AppBar>
    </Stack>
  )
}
