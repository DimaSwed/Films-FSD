import { keyframes } from '@mui/material/styles'

/** Шаг перфорации киноленты, px: по нему же рассчитан сдвиг анимации `slide`. */
export const STRIP_STEP = 36

export const reducedMotion = '@media (prefers-reduced-motion: reduce)'

export const spin = keyframes`
  to { transform: rotate(360deg); }
`

export const slide = keyframes`
  to { background-position-x: ${STRIP_STEP}px; }
`

/** Редкое «дрожание» кадра: почти всё время неподвижен, раз в цикл — короткий сбой. */
export const glitch = keyframes`
  0%, 88%, 100% { transform: none; text-shadow: none; }
  90% { transform: translateX(-3px); text-shadow: 3px 0 currentColor; }
  93% { transform: translateX(3px); text-shadow: -3px 0 currentColor; }
  96% { transform: translateX(-1px); text-shadow: 1px 0 currentColor; }
`
