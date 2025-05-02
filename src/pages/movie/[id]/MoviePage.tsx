import { useParams } from 'react-router-dom'

import { Box, Typography, Card, CardMedia, Grid, CircularProgress } from '@mui/material'

import { Stack } from '@mui/system'

import { useMovie } from '@/features/movie/hooks/use-movie'
import { ToggleWatchlistButton } from '@/features/watch-list'
import { useWatchProviders } from '@/features/movie'
import { WatchProviders } from '@/entities/movie'
import { ToggleFavoriteButton } from '@/features/favorites'

export const MoviePage = () => {
  const { id } = useParams<{ id: string }>()
  const movieId = Number(id)
  const { data: movie, isLoading, error } = useMovie(movieId)
  const { data: providers = [] } = useWatchProviders(movieId)

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100%'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (error) return <Box>Ошибка при загрузке информации о фильме.</Box>
  if (!movie) return <Box>Фильм не найден</Box>

  return (
    <Box
      component="main"
      sx={{
        color: 'secondary.contrastText',
        bgcolor: 'background.paper',
        width: '100%',
        overflow: 'hidden',
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.3)), url(${movie.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          padding: { xs: '10px', sm: '15px', md: '30px' }
        }}
      >
        {/* Movie Poster */}
        <Grid>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia component="img" alt={movie.title} height="500" image={movie.image} />
          </Card>
        </Grid>

        {/* Movie Details */}
        <Grid color={'white'}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {`"${movie.title}"`}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {movie.description}
            </Typography>
          </Box>

          {/* Дополнительные данные */}
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid>
              <Typography variant="subtitle1">
                <strong>Дата релиза:</strong>
              </Typography>
              <Typography variant="body2">
                {new Date(movie.releaseDate).toLocaleString('ru-RU', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle1">
                <strong>Жанр:</strong>
              </Typography>
              <Typography variant="body2">{movie.genre}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle1">
                <strong>Рейтинг:</strong>
              </Typography>
              <Typography variant="body2">{movie.rating.toFixed(1)}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle1">
                <strong>Длительность фильма:</strong>
              </Typography>
              <Typography variant="body2">
                {`${Math.floor(movie.duration / 60)} ч. ${movie.duration % 60} мин.`}
              </Typography>
            </Grid>
          </Grid>

          <Stack alignItems={'flex-start'} flexDirection={'row'} gap={1}>
            {providers.length > 0 && <WatchProviders providers={providers} />}
          </Stack>

          <Stack sx={{ flexDirection: { sm: 'row', xs: 'column' }, gap: 2, my: 3 }}>
            <ToggleFavoriteButton movieId={movie.id} />

            <ToggleWatchlistButton movieId={movie.id} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
