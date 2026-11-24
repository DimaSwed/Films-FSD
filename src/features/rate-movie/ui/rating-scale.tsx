import { Box, Button } from '@mui/material'
import { FC } from 'react'

import { RATING_VALUES } from '../config'

interface IRatingScaleProps {
  /** Выбранная оценка; половинчатая (8,5 с сайта TMDB) не выделяет ни одну кнопку. */
  value: number | null
  disabled: boolean
  onSelect: (value: number) => void
}

/** Кнопки 1–10. Не звёзды: десять звёзд в ряд на телефоне слишком мелкие для пальца. */
export const RatingScale: FC<IRatingScaleProps> = ({ value, disabled, onSelect }) => (
  <Box
    role="group"
    aria-label="Оценка от 1 до 10"
    sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 1 }}
  >
    {RATING_VALUES.map((option) => {
      const isSelected = option === value

      return (
        <Button
          key={option}
          variant="outlined"
          color="inherit"
          aria-label={`${option} из 10`}
          aria-pressed={isSelected}
          disabled={disabled}
          onClick={() => onSelect(option)}
          sx={{
            minWidth: 0,
            minHeight: 48,
            fontSize: 18,
            fontWeight: 'bold',
            ...(isSelected && {
              '&, &:hover, &.Mui-disabled': {
                bgcolor: 'warning.main',
                color: 'common.black',
                borderColor: 'warning.main'
              }
            })
          }}
        >
          {option}
        </Button>
      )
    })}
  </Box>
)
