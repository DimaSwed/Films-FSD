import { Box, Skeleton } from '@mui/material'
import { FC } from 'react'

/** Заглушка `SmallMovieCard` той же формы: постер 2:3, название в 2 строки и строка «год · жанр». */
export const SmallMovieCardSkeleton: FC = () => (
  <Box
    aria-hidden
    sx={{
      height: '100%',
      bgcolor: 'background.card',
      borderRadius: '14px',
      overflow: 'hidden',
      border: '1px solid',
      borderColor: 'outline.soft'
    }}
  >
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{ width: '100%', height: 'auto', aspectRatio: '2 / 3' }}
    />
    <Box sx={{ p: 1.5 }}>
      <Skeleton variant="text" sx={{ fontSize: 14, width: '90%' }} />
      <Skeleton variant="text" sx={{ fontSize: 14, width: '60%' }} />
      <Skeleton variant="text" sx={{ fontSize: 12, width: '45%', mt: 0.5 }} />
    </Box>
  </Box>
)
