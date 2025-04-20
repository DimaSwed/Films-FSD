import { FC } from 'react'
import { Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'

interface IRatingStarsProps {
  value: number
}

export const RatingStars: FC<IRatingStarsProps> = ({ value }) => {
  // Конвертируем из 10-балльной системы в 5-звездочную
  const starsValue = value / 2

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Rating value={starsValue} precision={0.5} readOnly />
      <Typography variant="body2" color="text.secondary">
        ({value.toFixed(1)})
      </Typography>
    </Box>
  )
}
