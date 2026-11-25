import { Box, alpha } from '@mui/material'
import { FC, useId } from 'react'

import { CLAPPER_REST_ANGLE, clap, reducedMotion } from './not-found-state.styles'

interface IClapperboardProps {
  /** Надпись на доске над номером («ПОДБОРКА», «ЖАНР»). */
  caption: string
}

const STRIPES = [0, 1, 2, 3, 4, 5]

/** Параллелограммы-«зебра» вдоль планки: `offset` сдвигает рисунок, чтобы планки чередовались. */
const stripes = (top: number, bottom: number, offset: number) =>
  STRIPES.map((i) => {
    const x = 6 + i * 30 + offset
    return `${x},${bottom} ${x + 15},${bottom} ${x + 27},${top} ${x + 12},${top}`
  })

/** Хлопушка с цифрами «404»; верхняя планка один раз хлопает при появлении. */
export const Clapperboard: FC<IClapperboardProps> = ({ caption }) => {
  const clipId = useId()

  return (
    <Box
      aria-hidden
      component="svg"
      viewBox="0 0 180 150"
      sx={(theme) => {
        const isLight = theme.palette.mode === 'light'
        return {
          width: { xs: 150, sm: 190 },
          height: 'auto',
          overflow: 'visible',
          // Цвета только из темы: чёрная доска и киноварные планки (light) / серая доска и белые планки (dark)
          '--board': isLight ? theme.palette.navigation.main : theme.palette.secondary.main,
          '--stripe': isLight ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.9),
          '--chalk': isLight ? theme.palette.navigation.contrastText : theme.palette.text.primary,
          '& .arm': {
            transformOrigin: '14px 50px',
            transformBox: 'view-box',
            transform: `rotate(${CLAPPER_REST_ANGLE}deg)`,
            animation: `${clap} 1.6s ease-out 0.3s both`,
            [reducedMotion]: { animation: 'none' }
          }
        }
      }}
    >
      <defs>
        <clipPath id={`${clipId}-arm`}>
          <rect x="10" y="28" width="160" height="22" rx="3" />
        </clipPath>
        <clipPath id={`${clipId}-bar`}>
          <rect x="10" y="52" width="160" height="18" rx="3" />
        </clipPath>
      </defs>

      {/* Доска */}
      <rect x="10" y="52" width="160" height="92" rx="5" fill="var(--board)" />

      {/* Нижняя планка на корпусе */}
      <g clipPath={`url(#${clipId}-bar)`}>
        {stripes(52, 70, 15).map((points) => (
          <polygon key={points} points={points} fill="var(--stripe)" />
        ))}
      </g>

      {/* Разметка доски мелом */}
      <g stroke="var(--chalk)" strokeOpacity="0.35" strokeWidth="1.5">
        <line x1="10" y1="98" x2="170" y2="98" />
        <line x1="112" y1="98" x2="112" y2="144" />
      </g>
      <g fill="var(--chalk)" fontFamily="Ubuntu, sans-serif">
        <text x="20" y="89" fontSize="11" letterSpacing="3" opacity="0.8">
          {caption}
        </text>
        <text x="20" y="136" fontSize="38" fontWeight="700">
          404
        </text>
        <text x="122" y="114" fontSize="8" letterSpacing="2" opacity="0.8">
          ДУБЛЬ
        </text>
        <text x="122" y="136" fontSize="20" fontWeight="700">
          1
        </text>
      </g>

      {/* Верхняя планка (хлопает) */}
      <g className="arm">
        <rect x="10" y="28" width="160" height="22" rx="3" fill="var(--board)" />
        <g clipPath={`url(#${clipId}-arm)`}>
          {stripes(28, 50, 0).map((points) => (
            <polygon key={points} points={points} fill="var(--stripe)" />
          ))}
        </g>
      </g>

      {/* Шарнир */}
      <circle cx="14" cy="50" r="4.5" fill="var(--stripe)" />
    </Box>
  )
}
