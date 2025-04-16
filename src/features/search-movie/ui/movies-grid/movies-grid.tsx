import { Box, CircularProgress, Typography } from '@mui/material'
import { SmallMovieCard } from '@/entities/movie'
import { IMovie } from '@/shared/types/common.types'

interface IMoviesGridProps {
  movies: IMovie[]
  isLoading: boolean
}

export const MoviesGrid = ({ movies, isLoading }: IMoviesGridProps) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

  if (movies.length === 0) {
    return (
      <Typography variant="h6" color="text.primary" textAlign={'center'}>
        Ничего не найдено. Попробуйте изменить параметры поиска.
      </Typography>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', padding: '0 10px', gap: '16px' }}>
      {movies.map((movie) => (
        <Box
          key={movie.id}
          sx={{
            flex: {
              xs: '1 1 100%',
              sm: '1 1 calc(50% - 16px)',
              md: '1 1 calc(33.33% - 16px)',
              lg: '1 1 calc(25% - 16px)'
            },
            boxSizing: 'border-box'
          }}
        >
          <SmallMovieCard movie={movie} />
        </Box>
      ))}
    </Box>
  )
}
