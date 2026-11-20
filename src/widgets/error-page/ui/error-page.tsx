import { Box, Button, Stack, Typography } from '@mui/material'
import { FC } from 'react'

import { glitch, reducedMotion } from './error-page.styles'
import { FilmReel } from './film-reel'
import { FilmStrip } from './film-strip'

interface IErrorPageProps {
  /** Действие кнопки. По умолчанию — перезагрузка страницы. */
  onReload?: () => void
}

const reloadPage = () => window.location.reload()

/** Запасной экран на случай непредвиденной ошибки рендера. */
export const ErrorPage: FC<IErrorPageProps> = ({ onReload = reloadPage }) => (
  <Box
    component="main"
    sx={{
      // html/body без прокрутки (global.sass): экран скроллится сам, чтобы кнопки были доступны
      // на низких экранах (телефон в ландшафте); dvh — высота без учёта панелей Safari
      height: '100dvh',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
      color: 'text.primary'
    }}
  >
    <FilmStrip safeTop />

    <Stack
      sx={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: { xs: 2, sm: 3 },
        px: 3,
        py: 4
      }}
    >
      <FilmReel />

      <Typography
        variant="overline"
        sx={{ letterSpacing: 4, color: 'text.secondary', lineHeight: 1 }}
      >
        КиноТрекер · сеанс прерван
      </Typography>

      <Typography
        component="h1"
        sx={{
          fontWeight: 700,
          lineHeight: 1.05,
          fontSize: 'clamp(36px, 9vw, 84px)',
          textTransform: 'uppercase'
        }}
      >
        Плёнка{' '}
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            color: 'error.main',
            animation: `${glitch} 5s infinite`,
            [reducedMotion]: { animation: 'none' }
          }}
        >
          порвалась
        </Box>
      </Typography>

      <Typography variant="body1" role="alert" sx={{ maxWidth: 520, color: 'text.secondary' }}>
        Что-то пошло не так, и кадр не загрузился. Склеим плёнку заново — перезагрузите страницу, и
        сеанс продолжится.
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.5} sx={{ mt: 1 }}>
        <Button variant="contained" color="secondary" size="large" onClick={onReload}>
          Перезагрузить страницу
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          href="/"
          sx={{ borderColor: 'divider' }}
        >
          На главную
        </Button>
      </Stack>
    </Stack>

    <FilmStrip reverse />
  </Box>
)
