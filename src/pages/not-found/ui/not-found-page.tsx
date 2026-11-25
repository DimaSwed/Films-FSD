import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useId } from 'react'
import { Link } from 'react-router-dom'

import { PageMeta, PageShell } from '@/shared/ui'

import { CinemaScreen } from './cinema-screen'
import { CinemaSeats } from './cinema-seats'
import { notFoundStyles } from './not-found-page.styles'

const PROGRAM = [
  { label: 'Сейчас в прокате', to: '/category/сейчас-в-прокате' },
  { label: 'Фильмы по жанрам', to: '/movies' },
  { label: 'Трейлеры', to: '/trailers' }
]

/** Несуществующий маршрут. Неизвестные фильм, жанр и подборка — `NotFoundState` в `shared/ui`. */
export const NotFoundPage = () => {
  const programTitleId = useId()

  return (
    <PageShell sx={notFoundStyles.hall}>
      <PageMeta title="Страница не найдена" noIndex />

      <Stack sx={notFoundStyles.content}>
        <Box sx={notFoundStyles.beam} />
        <CinemaScreen />

        <Typography variant="overline" sx={notFoundStyles.eyebrow}>
          КиноТрекер · зал 404
        </Typography>

        <Typography component="h1" sx={notFoundStyles.title}>
          Страницы{' '}
          <Box component="span" sx={notFoundStyles.accent}>
            нет в прокате
          </Box>
        </Typography>

        <Typography variant="body1" sx={notFoundStyles.description}>
          В адресе опечатка, или страницу уже сняли с показа. Вернитесь на главную или найдите фильм
          по названию.
        </Typography>

        <Stack sx={notFoundStyles.actions}>
          <Button
            component={Link}
            to="/"
            size="large"
            variant="contained"
            color="secondary"
            sx={notFoundStyles.primaryAction}
          >
            На главную
          </Button>
          <Button
            component={Link}
            to="/search"
            size="large"
            variant="outlined"
            color="inherit"
            sx={notFoundStyles.secondaryAction}
          >
            Найти фильм
          </Button>
        </Stack>

        <Box component="nav" aria-labelledby={programTitleId} sx={notFoundStyles.program}>
          <Typography
            id={programTitleId}
            component="h2"
            variant="subtitle1"
            sx={notFoundStyles.programTitle}
          >
            Сегодня в программе
          </Typography>
          <Box component="ul" sx={notFoundStyles.programList}>
            {PROGRAM.map(({ label, to }) => (
              <li key={to}>
                <Box component={Link} to={to} sx={notFoundStyles.programLink}>
                  {label}
                  <ArrowForwardIcon aria-hidden />
                </Box>
              </li>
            ))}
          </Box>
        </Box>
      </Stack>

      <CinemaSeats />
    </PageShell>
  )
}
