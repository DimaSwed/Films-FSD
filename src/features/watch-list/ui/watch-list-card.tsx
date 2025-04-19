import { Box, Card, CardMedia, Typography, Rating, Button, Stack } from '@mui/material'
import { IMovie } from '@/shared/types'

interface MovieCardProps {
  movie: IMovie
  onRemoveFromWatchlist: () => void
}

export const WatchListCard = ({ movie, onRemoveFromWatchlist }: MovieCardProps) => (
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
        <strong>&quot;{movie?.title}&quot;</strong>
      </Typography>
      <Stack gap={1}>
        <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
          <strong>Год:</strong> {movie.year}
        </Typography>
        <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
          <strong>Жанр:</strong> {movie.genre ?? 'Неизвестно'}
        </Typography>
        <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
          <strong>Описание:</strong> {movie.description ?? 'Неизвестно'}
        </Typography>
        <Rating value={movie.rating} readOnly />
      </Stack>
      <Button
        variant="contained"
        color="error"
        onClick={onRemoveFromWatchlist}
        sx={{ mt: 2, maxWidth: '170px' }}
      >
        Убрать из списка
      </Button>
    </Box>
  </Card>
)
