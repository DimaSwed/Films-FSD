import { Box, Button } from '@mui/material'
import { FC } from 'react'

import { IMovie } from '@/shared/lib'

import { TrailerCardLayout } from './trailer-card-layout'
import { TrailerCardTitle } from './trailer-card-title'

interface ITrailerCardErrorProps {
  movie: IMovie
  onRetry: () => void
}

/** Карточка, если запрос ролика не удался: фильм остаётся в списке, загрузку можно повторить. */
export const TrailerCardError: FC<ITrailerCardErrorProps> = ({ movie, onRetry }) => (
  <TrailerCardLayout
    media={
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Button
          variant="outlined"
          onClick={onRetry}
          aria-label={`Повторить загрузку трейлера: ${movie.title}`}
          sx={{ color: 'common.white', borderColor: 'common.white' }}
        >
          Повторить
        </Button>
      </Box>
    }
  >
    <TrailerCardTitle movie={movie} meta="Не удалось загрузить трейлер" />
  </TrailerCardLayout>
)
