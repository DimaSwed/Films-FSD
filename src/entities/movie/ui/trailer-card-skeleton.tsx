import { Skeleton } from '@mui/material'

import { TrailerCardLayout } from './trailer-card-layout'

/** Карточка, пока ролик запрашивается. */
export const TrailerCardSkeleton = () => (
  <TrailerCardLayout
    media={
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        sx={{ position: 'absolute', inset: 0, bgcolor: 'grey.700' }}
      />
    }
  >
    <Skeleton width="70%" />
    <Skeleton width="45%" />
  </TrailerCardLayout>
)
