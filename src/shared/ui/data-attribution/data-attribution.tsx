import { Link, Typography, TypographyProps } from '@mui/material'
import { FC } from 'react'

const TMDB_URL = 'https://www.themoviedb.org/'
const JUSTWATCH_URL = 'https://www.justwatch.com/'

const linkProps = { target: '_blank', rel: 'noopener noreferrer', color: 'inherit' } as const

/** Обязательная атрибуция TMDB: текст дан по их требованиям и намеренно не переводится. */
export const TmdbAttribution: FC<TypographyProps> = (props) => (
  <Typography variant="body2" {...props}>
    This product uses the{' '}
    <Link href={TMDB_URL} {...linkProps}>
      TMDB
    </Link>{' '}
    API but is not endorsed or certified by TMDB.
  </Typography>
)

/** Подпись под блоком «Где смотреть»: данные о стримингах TMDB получает от JustWatch. */
export const JustWatchAttribution: FC<TypographyProps> = ({ sx, ...props }) => (
  <Typography
    variant="caption"
    sx={[{ display: 'block', opacity: 0.7 }, ...(Array.isArray(sx) ? sx : [sx])]}
    {...props}
  >
    Данные о стриминговых сервисах:{' '}
    <Link href={JUSTWATCH_URL} {...linkProps}>
      JustWatch
    </Link>
  </Typography>
)
