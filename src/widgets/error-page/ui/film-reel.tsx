import { Box, Typography } from '@mui/material'
import { FC } from 'react'

import { reducedMotion, spin } from './error-page.styles'

const HOLES_COUNT = 6

const HOLES = Array.from({ length: HOLES_COUNT }, (_, index) => {
  const angle = (index * 2 * Math.PI) / HOLES_COUNT
  return { id: index, cx: 60 + 33 * Math.cos(angle), cy: 60 + 33 * Math.sin(angle) }
})

/** Катушка с плёнкой; в ступице — восклицательный знак цвета ошибки. */
export const FilmReel: FC = () => (
  <Box
    aria-hidden
    sx={{
      position: 'relative',
      width: { xs: 120, sm: 150 },
      aspectRatio: '1',
      color: 'secondary.main'
    }}
  >
    <Box
      component="svg"
      viewBox="0 0 120 120"
      sx={(theme) => ({
        width: '100%',
        height: '100%',
        animation: `${spin} 14s linear infinite`,
        [reducedMotion]: { animation: 'none' },
        '& .hole': { fill: theme.palette.background.default }
      })}
    >
      <circle cx="60" cy="60" r="56" fill="currentColor" />
      {HOLES.map((hole) => (
        <circle key={hole.id} className="hole" cx={hole.cx} cy={hole.cy} r="12" />
      ))}
      <circle className="hole" cx="60" cy="60" r="16" />
    </Box>

    <Typography
      component="span"
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: { xs: 34, sm: 44 },
        fontWeight: 700,
        color: 'error.main'
      }}
    >
      !
    </Typography>
  </Box>
)
