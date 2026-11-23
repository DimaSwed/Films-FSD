import { Box } from '@mui/material'
import { FC, useState } from 'react'

import { TrailerCard, TrailerCardError, TrailerCardSkeleton } from '@/entities/movie'

import type { TTrailerItem } from '../model'

interface ITrailerListProps {
  items: TTrailerItem[]
  onRetry: () => void
}

/** Сетка трейлеров. Одновременно загружен один плеер: запуск следующего убирает предыдущий. */
export const TrailerList: FC<ITrailerListProps> = ({ items, onRetry }) => {
  const [playingId, setPlayingId] = useState<number | null>(null)

  return (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 2, md: 3 },
        mb: 4,
        gridTemplateColumns: {
          xs: 'minmax(0, 1fr)',
          sm: 'repeat(auto-fill, minmax(280px, 1fr))'
        }
      }}
    >
      {items.map((item) => {
        const { movie } = item

        switch (item.status) {
          case 'pending':
            return <TrailerCardSkeleton key={movie.id} />
          case 'error':
            return <TrailerCardError key={movie.id} movie={movie} onRetry={onRetry} />
          case 'ready':
            return (
              <TrailerCard
                key={movie.id}
                movie={movie}
                trailer={item.trailer}
                isPlaying={movie.id === playingId}
                onPlay={setPlayingId}
              />
            )
        }
      })}
    </Box>
  )
}
