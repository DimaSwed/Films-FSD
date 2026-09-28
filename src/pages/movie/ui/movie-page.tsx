import { Box, Typography, Card, CardMedia, Grid } from '@mui/material'
import { Stack } from '@mui/system'
import { useParams } from 'react-router-dom'

import { ToggleFavoriteButton } from '@/features/favorites'
import { ToggleWatchlistButton } from '@/features/watch-list'
import { WatchProviders, useMovie, useWatchProviders } from '@/entities/movie'
import { EmptyState, LoadingErrorState, PageShell } from '@/shared/ui'

export const MoviePage = () => {
  const { id } = useParams<{ id: string }>()
  const movieId = Number(id)
  const { data: movie, isLoading, isError } = useMovie(movieId)
  const { data: providers = [] } = useWatchProviders(movieId)

  if (isLoading || isError) {
    return (
      <PageShell centered>
        <LoadingErrorState
          isLoading={isLoading}
          isError={isError}
          loadingText="Загружаем информацию о фильме..."
          errorTitle="Ошибка загрузки фильма"
          errorDescription="Не удалось загрузить информацию о фильме. Попробуйте позже."
        />
      </PageShell>
    )
  }

  if (!movie) {
    return (
      <PageShell centered>
        <EmptyState
          title="Фильм не найден"
          description="Возможно, он был удалён или ссылка неверна."
        />
      </PageShell>
    )
  }

  return (
    <PageShell
      sx={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.3)), url(${movie.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
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
    </PageShell>
  )
}
