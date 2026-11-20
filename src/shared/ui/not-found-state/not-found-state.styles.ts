import { keyframes } from '@mui/material/styles'

export const reducedMotion = '@media (prefers-reduced-motion: reduce)'

/** Угол, в котором верхняя планка хлопушки остаётся «приоткрытой» после хлопка. */
export const CLAPPER_REST_ANGLE = -9

/** Хлопок: планка резко опускается и чуть отскакивает назад. Один раз при появлении. */
export const clap = keyframes`
  0% { transform: rotate(-32deg); }
  45% { transform: rotate(0deg); }
  60% { transform: rotate(${CLAPPER_REST_ANGLE}deg); }
  100% { transform: rotate(${CLAPPER_REST_ANGLE}deg); }
`

/** Редкое «дрожание» кадра — как на экране ошибки (`widgets/error-page`). */
export const glitch = keyframes`
  0%, 88%, 100% { transform: none; text-shadow: none; }
  90% { transform: translateX(-3px); text-shadow: 3px 0 currentColor; }
  93% { transform: translateX(3px); text-shadow: -3px 0 currentColor; }
  96% { transform: translateX(-1px); text-shadow: 1px 0 currentColor; }
`
