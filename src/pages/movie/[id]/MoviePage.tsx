import { Box, Typography, Card, CardMedia, Grid, Button, CircularProgress } from '@mui/material'
import { useMovie } from '@/features/movie/hooks/use-movie'
import { useAddToWatchlist } from '@/features/movie/hooks/use-watchlist'
import StarIcon from '@mui/icons-material/Star'
import AddIcon from '@mui/icons-material/Add'
import { useParams } from 'react-router-dom'
import { useSessionId } from '@/features/auth/hooks'
import { Stack } from '@mui/system'

export const MoviePage = () => {
  const { id } = useParams<{ id: string }>()
  const movieId = Number(id)
  const { data: movie, isLoading, error } = useMovie(movieId)
  // console.log(movie)
  const { mutate: addToWatchlist, isPending: isAdding, isError: isAddError } = useAddToWatchlist()
  const sessionId = useSessionId()

  const handleAddToWatchlist = () => {
    if (!sessionId) return
    addToWatchlist(movieId)
  }

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

  if (error) {
    return <Box>Ошибка при загрузке информации о фильме.</Box>
  }

  if (!movie) {
    return <Box>Фильм не найден</Box>
  }

  return (
    <Box
      component="main"
      minHeight={'100%'}
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

          {/* Additional Details */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
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

          <Stack sx={{ flexDirection: { sm: 'row', xs: 'column' }, gap: 2, mt: 2 }}>
            {/* ДОБАВИТЬ ВОЗМОЖНОСТЬ ОЦЕНКИ */}
            <Button variant="contained" startIcon={<StarIcon />} color="primary">
              Оценить
            </Button>
            {/* ДОБАВИТЬ ОТОБРАЖЕНИЕ ЕСЛИ УЖЕ В СПИСКЕ ИМЕЕТСЯ */}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              color="primary"
              disabled={isAdding || !sessionId}
              onClick={handleAddToWatchlist}
            >
              {isAdding ? 'Добавление...' : 'Добавить в список просмотра'}
            </Button>
            {isAddError && (
              <Typography color="error" variant="body2">
                Не удалось добавить в список просмотра. Попробуйте позже.
              </Typography>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
