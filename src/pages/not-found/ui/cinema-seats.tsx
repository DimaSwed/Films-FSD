import { Box } from '@mui/material'
import { FC, useId } from 'react'

import { notFoundStyles } from './not-found-page.styles'

const SEAT_WIDTH = 64
const SEAT_HEIGHT = 60
/** Ряд рисуется с запасом в обе стороны от центра — хватает на сверхширокий экран. */
const HALF_ROW = SEAT_WIDTH * 40

const SEAT_PATH = 'M6 61V20Q6 3 22 3H42Q58 3 58 20V61Z'
/** Голова и плечи со спины; ниже силуэт закрыт спинкой кресла. */
const VIEWER_PATH = 'M-18 60V44C-18 34 -8 33 -5 29V25A12.5 12.5 0 1 1 5 25V29C8 33 18 34 18 44V60Z'

/** Ряды кресел со спины; в дальнем ряду сидит единственный зритель. */
export const CinemaSeats: FC = () => {
  const id = useId()

  return (
    <Box aria-hidden component="svg" sx={notFoundStyles.seats}>
      <defs>
        {['back', 'front'].map((row) => (
          <pattern
            key={row}
            id={`${id}-${row}`}
            width={SEAT_WIDTH}
            height={SEAT_HEIGHT}
            patternUnits="userSpaceOnUse"
          >
            <g className={row}>
              <path d={SEAT_PATH} />
              <path d="M0 61V34H7V61ZM57 61V34H64V61Z" stroke="none" />
            </g>
          </pattern>
        ))}
      </defs>

      {/* Начало координат — середина по ширине: ряды симметричны на любом экране */}
      <svg x="50%" overflow="visible">
        <g transform="scale(0.8)">
          <path className="back" d={VIEWER_PATH} transform={`translate(${SEAT_WIDTH * 1.5} 0)`} />
          <g transform="translate(0 36)">
            <rect
              x={-HALF_ROW}
              width={HALF_ROW * 2}
              height={SEAT_HEIGHT}
              fill={`url(#${id}-back)`}
            />
            {/* Низ ряда: закрывает просветы под подлокотниками переднего */}
            <rect x={-HALF_ROW} y="50" width={HALF_ROW * 2} height="60" fill="var(--seat-back)" />
          </g>
        </g>
        <g transform={`translate(${SEAT_WIDTH / 2} 52)`}>
          <rect
            x={-HALF_ROW}
            width={HALF_ROW * 2}
            height={SEAT_HEIGHT}
            fill={`url(#${id}-front)`}
          />
        </g>
      </svg>
    </Box>
  )
}
