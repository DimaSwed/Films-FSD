import { Box } from '@mui/material'
import { FC, useId } from 'react'

import { COUNTDOWN, SWEEP_RADIUS, notFoundStyles } from './not-found-page.styles'

const CENTER = { x: 160, y: 90 }

const digitProps = {
  x: CENTER.x,
  y: CENTER.y,
  dy: '0.36em',
  textAnchor: 'middle' as const,
  fill: 'var(--ink)',
  fontFamily: 'Ubuntu, sans-serif',
  fontWeight: 700
}

/** Сцена: занавес открывается, на экране идёт отсчёт стартового ракорда 3–2–1 и остаётся «404». */
export const CinemaScreen: FC = () => {
  const vignetteId = useId()

  return (
    <Box aria-hidden sx={notFoundStyles.stage}>
      <Box
        component="svg"
        viewBox="0 0 320 180"
        preserveAspectRatio="xMidYMid slice"
        sx={notFoundStyles.screen}
      >
        <defs>
          <radialGradient id={vignetteId} cx="50%" cy="50%" r="65%">
            <stop offset="45%" stopColor="var(--ink)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--ink)" stopOpacity="0.22" />
          </radialGradient>
        </defs>

        <rect width="320" height="180" fill="var(--screen)" />

        <circle
          className="sweep"
          cx={CENTER.x}
          cy={CENTER.y}
          r={SWEEP_RADIUS}
          fill="none"
          stroke="var(--ink)"
          strokeOpacity="0.18"
          strokeWidth={SWEEP_RADIUS * 2}
          transform={`rotate(-90 ${CENTER.x} ${CENTER.y})`}
        />

        {/* Разметка ракорда: перекрестье и два кольца */}
        <g fill="none" stroke="var(--ink)" strokeOpacity="0.45">
          <path d="M0 90H320M160 0V180" />
          <circle cx={CENTER.x} cy={CENTER.y} r="78" strokeWidth="2" />
          <circle cx={CENTER.x} cy={CENTER.y} r="70" strokeWidth="2" />
        </g>

        {COUNTDOWN.map((digit) => (
          <text key={digit} className={`digit digit-${digit}`} {...digitProps} fontSize="104">
            {digit}
          </text>
        ))}
        <text className="code" {...digitProps} fontSize="76" letterSpacing="-1">
          404
        </text>

        <rect width="320" height="180" fill={`url(#${vignetteId})`} />
      </Box>

      <Box sx={notFoundStyles.curtain('left')} />
      <Box sx={notFoundStyles.curtain('right')} />
      <Box sx={notFoundStyles.valance} />
    </Box>
  )
}
