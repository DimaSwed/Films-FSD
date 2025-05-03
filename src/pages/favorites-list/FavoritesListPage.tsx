import { Box, Fade, Typography } from '@mui/material'
import { useFavoriteMovies, useFavorites } from '@/features/favorites'
import { EmptyState, LoadingErrorState } from '@/shared/ui'
import { SmallMovieCard } from '@/entities/movie'
import { Stack } from '@mui/system'

export const FavoritesListPage = () => {
  const { data, isLoading, isError, error, isFetched } = useFavorites()
  const hasIds = !isLoading && !!data?.results?.length

  const {
    movies,
    isMoviesLoading: areMoviesLoading,
    isMoviesError: areMoviesError
  } = useFavoriteMovies(data?.results || [])

  console.log(movies)

  return (
    <Box
      component="main"
      minHeight="100%"
      sx={{
        padding: { xs: '10px', sm: '15px', md: '30px' },
        color: 'secondary.contrastText',
        bgcolor: 'background.paper',
        width: '100%'
      }}
    >
      <Typography variant="h3" gutterBottom textAlign="center" mb={{ xs: 1, md: 4 }}>
        Список избранного
      </Typography>

      <LoadingErrorState
        isLoading={isLoading || areMoviesLoading}
        isError={isError || areMoviesError}
        error={error}
      />

      {isFetched && !isLoading && !isError && !hasIds && (
        <Fade in={true}>
          <Box sx={{ mt: 5 }}>
            <EmptyState
              title="Нет фильмов в избранном"
              description="Найдите фильмы и добавьте их в список избранных, чтобы пересмотреть их позже."
            />
          </Box>
        </Fade>
      )}

      {!!movies.length && !areMoviesLoading && !areMoviesError && (
        <Fade in={true}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            gap={2}
            justifyContent="center"
            mb={4}
          >
            {movies.map((movie) => (
              <Stack key={movie?.id} position="relative">
                <SmallMovieCard movie={movie} />
              </Stack>
            ))}
          </Box>
        </Fade>
      )}
    </Box>
  )
}
