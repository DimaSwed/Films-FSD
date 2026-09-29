import { Box, CircularProgress, Typography } from '@mui/material'
import { ReactNode } from 'react'

import { MovieGrid, SmallMovieCard } from '@/entities/movie'
import { IMovie } from '@/shared/lib'

interface IMoviesGridProps {
  movies: IMovie[]
  isLoading: boolean
  renderActions?: (movie: IMovie) => ReactNode
}

export const MoviesGrid = ({ movies, isLoading, renderActions }: IMoviesGridProps) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
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
    <Box sx={{ width: '100%' }}>
      <MovieGrid>
        {movies.map((movie) => (
          <SmallMovieCard key={movie.id} movie={movie} actions={renderActions?.(movie)} />
        ))}
      </MovieGrid>
    </Box>
  )
}
