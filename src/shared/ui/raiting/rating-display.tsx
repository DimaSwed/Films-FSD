import { FC } from 'react'
import { Box, Typography } from '@mui/material'

interface IRatingDisplayProps {
  value: number
  max?: number
}

export const RatingDisplay: FC<IRatingDisplayProps> = ({ value, max = 10 }) => {
  const normalizedValue = Math.min(Math.max(value, 0), max)
  const percentage = (normalizedValue / max) * 100

  const getBarColor = () => {
    if (percentage > 70) return 'success.main'
    if (percentage > 40) return 'warning.main'
    return 'error.main'
  }

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
        <strong>Рейтинг:</strong>
      </Typography>
      <Box
        position="relative"
        width="100%"
        maxWidth={120}
        height={16}
        bgcolor="divider"
        borderRadius={4}
        overflow="hidden"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          height="100%"
          width={`${percentage}%`}
          bgcolor={getBarColor()}
        />
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: percentage > 40 ? 'common.black' : 'common.white',
            fontWeight: 500
          }}
        >
          {normalizedValue.toFixed(1)}
        </Typography>
      </Box>
    </Box>
  )
}
