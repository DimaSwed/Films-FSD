import { useState } from 'react'
import { Box, Card, CardMedia, Typography, Rating, Button, Stack, Collapse } from '@mui/material'
import { IMovie } from '@/shared/types'

interface MovieCardProps {
  movie: IMovie
  onRemoveFromWatchlist: () => void
}

export const WatchListCard = ({ movie, onRemoveFromWatchlist }: MovieCardProps) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)

  const toggleDescription = () => {
    setIsDescriptionOpen((prev) => !prev)
  }

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
        mb: 2,
        boxShadow: 4,
        borderRadius: 2,
        bgcolor: 'background.paper'
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 150, height: 225 }}
        image={movie.image}
        alt={movie.title}
      />
      <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ color: 'secondary.contrastText', mb: '3px' }}>
          <strong>&quot;{movie.title}&quot;</strong>
        </Typography>

        <Stack gap={1}>
          <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
            <strong>Год:</strong> {movie.year}
          </Typography>
          <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
            <strong>Жанр:</strong> {movie.genre ?? 'Неизвестно'}
          </Typography>

          <Collapse in={isDescriptionOpen} timeout="auto" unmountOnExit>
            <Typography variant="body2" sx={{ color: 'secondary.contrastText', mt: 1 }}>
              <strong>Описание:</strong> {movie.description ?? 'Неизвестно'}
            </Typography>
          </Collapse>

          <Rating value={movie.rating} readOnly />
        </Stack>

        <Stack direction="row" spacing={2} mt={2} flexWrap="wrap">
          <Button
            variant="outlined"
            size="small"
            onClick={toggleDescription}
            sx={{ minWidth: '140px' }}
          >
            {isDescriptionOpen ? 'Скрыть описание' : 'Показать описание'}
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={onRemoveFromWatchlist}
            sx={{ minWidth: '140px' }}
          >
            Убрать из списка
          </Button>
        </Stack>
      </Box>
    </Card>
  )
}
