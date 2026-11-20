import { Box, alpha } from '@mui/material'
import { FC } from 'react'

import { STRIP_STEP, reducedMotion, slide } from './error-page.styles'

interface IFilmStripProps {
  /** Бежит в обратную сторону — чтобы верхняя и нижняя ленты двигались навстречу. */
  reverse?: boolean
  /** Добавляет отступ под вырез/статус-бар iOS (для ленты у верхнего края). */
  safeTop?: boolean
}

/** Лента с перфорацией; бежит по горизонтали. */
export const FilmStrip: FC<IFilmStripProps> = ({ reverse, safeTop }) => (
  <Box
    aria-hidden
    sx={(theme) => ({
      flexShrink: 0,
      height: 44,
      boxSizing: 'content-box',
      paddingTop: safeTop ? 'env(safe-area-inset-top)' : 0,
      bgcolor: alpha(theme.palette.text.primary, 0.08),
      backgroundImage: `repeating-linear-gradient(90deg, ${theme.palette.background.default} 0 18px, transparent 18px ${STRIP_STEP}px)`,
      // Тайл ровно в один шаг перфорации: при сдвиге на STRIP_STEP лента бесшовно зацикливается
      backgroundSize: `${STRIP_STEP}px 16px`,
      backgroundRepeat: 'repeat-x',
      backgroundPosition: 'center',
      animation: `${slide} 2.4s linear infinite ${reverse ? 'reverse' : ''}`,
      [reducedMotion]: { animation: 'none' }
    })}
  />
)
