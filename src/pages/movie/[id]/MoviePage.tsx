import { useParams } from 'react-router-dom'

import { Box, Typography, Card, CardMedia, Grid, Button, CircularProgress } from '@mui/material'
import { Stack } from '@mui/system'
import StarIcon from '@mui/icons-material/Star'
import AddIcon from '@mui/icons-material/Add'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import { useMovie } from '@/features/movie/hooks/use-movie'
import { useAddToWatchlist, useRemoveFromWatchList, useWatchList } from '@/features/watch-list'
import { useSessionId } from '@/features/auth'
import { useEffect, useState } from 'react'

export const MoviePage = () => {
  const { id } = useParams<{ id: string }>()
  const movieId = Number(id)
  const { data: movie, isLoading, error } = useMovie(movieId)

  const sessionId = useSessionId()

  const { filteredMovies } = useWatchList()
  const [isInWatchlist, setIsInWatchlist] = useState(false)

  const { mutate: addToWatchlist, isPending: isAdding, isError: isAddError } = useAddToWatchlist()
  const {
    mutate: removeFromWatchlist,
    isPending: isRemoving,
    isError: isRemoveError
  } = useRemoveFromWatchList()

  useEffect(() => {
    const inList = filteredMovies?.some((m) => m.id === movieId) ?? false
    setIsInWatchlist(inList)
  }, [filteredMovies, movieId])

  const handleToggleWatchlist = () => {
    if (!sessionId) return

    if (isInWatchlist) {
      removeFromWatchlist(movieId, {
        onSuccess: () => setIsInWatchlist(false)
      })
    } else {
      addToWatchlist(movieId, {
        onSuccess: () => setIsInWatchlist(true)
      })
    }
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
            <Button variant="contained" startIcon={<StarIcon />} color="primary">
              Оценить
            </Button>

            <Button
              variant="contained"
              color={isInWatchlist ? 'secondary' : 'primary'}
              startIcon={
                isInWatchlist ? (
                  isRemoving ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <CheckCircleIcon />
                  )
                ) : (
                  <AddIcon />
                )
              }
              disabled={isAdding || isRemoving || !sessionId}
              onClick={handleToggleWatchlist}
              sx={{
                '&.MuiButton-containedSecondary': {
                  backgroundColor: 'success.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'success.dark'
                  }
                }
              }}
            >
              {isAddError || isRemoveError
                ? 'Ошибка'
                : isAdding
                  ? 'Добавление...'
                  : isRemoving
                    ? 'Удаление...'
                    : isInWatchlist
                      ? 'В списке'
                      : 'Добавить в список просмотра'}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
