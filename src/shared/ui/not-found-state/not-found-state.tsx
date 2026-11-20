import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { PageShell } from '../page-shell'

import { Clapperboard } from './clapperboard'
import { glitch, reducedMotion } from './not-found-state.styles'

interface ILinkItem {
  label: string
  to: string
}

interface INotFoundStateProps {
  /** Надпись на хлопушке над «404» (коротко, заглавными: «ПОДБОРКА», «ЖАНР»). */
  caption: string
  /** Заголовок; `accent` дописывается к нему и подсвечивается цветом ошибки. */
  title: string
  accent: string
  description: string
  /** Заголовок над подсказками. */
  suggestionsTitle?: string
  /** Куда можно перейти вместо несуществующей страницы — чипы-ссылки. */
  suggestions?: ILinkItem[]
  /** Кнопки: первая — основная, остальные — второстепенные. */
  actions: ILinkItem[]
}

/**
 * Состояние «такой подборки/жанра нет» внутри страницы (шапка и сайдбар остаются на месте).
 * Для несуществующего маршрута целиком — `pages/not-found`.
 */
export const NotFoundState: FC<INotFoundStateProps> = ({
  caption,
  title,
  accent,
  description,
  suggestionsTitle,
  suggestions = [],
  actions
}) => (
  <PageShell centered sx={{ py: { xs: 3, sm: 5 }, px: 2 }}>
    <Stack alignItems="center" textAlign="center" gap={{ xs: 2, sm: 3 }} sx={{ maxWidth: 720 }}>
      <Clapperboard caption={caption} />

      <Typography
        variant="overline"
        sx={{ letterSpacing: 4, color: 'text.secondary', lineHeight: 1 }}
      >
        КиноТрекер · дубль 404
      </Typography>

      <Typography
        component="h1"
        sx={{
          fontWeight: 700,
          lineHeight: 1.05,
          fontSize: 'clamp(30px, 7vw, 60px)',
          textTransform: 'uppercase'
        }}
      >
        {title}{' '}
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            color: 'error.main',
            animation: `${glitch} 5s infinite`,
            [reducedMotion]: { animation: 'none' }
          }}
        >
          {accent}
        </Box>
      </Typography>

      <Typography variant="body1" sx={{ maxWidth: 520, color: 'text.secondary' }}>
        {description}
      </Typography>

      {suggestions.length > 0 && (
        <Stack alignItems="center" gap={1.5}>
          {suggestionsTitle && (
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              {suggestionsTitle}
            </Typography>
          )}
          <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={1}>
            {suggestions.map(({ label, to }) => (
              <Chip
                key={to}
                component={Link}
                to={to}
                label={label}
                clickable
                variant="outlined"
                sx={{ borderColor: 'divider', color: 'text.primary' }}
              />
            ))}
          </Stack>
        </Stack>
      )}

      <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.5} sx={{ mt: 1 }}>
        {actions.map(({ label, to }, index) => (
          <Button
            key={to}
            component={Link}
            to={to}
            size="large"
            variant={index === 0 ? 'contained' : 'outlined'}
            color={index === 0 ? 'secondary' : 'inherit'}
            sx={index === 0 ? undefined : { borderColor: 'divider' }}
          >
            {label}
          </Button>
        ))}
      </Stack>
    </Stack>
  </PageShell>
)
