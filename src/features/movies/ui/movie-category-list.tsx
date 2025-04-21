import { FC } from 'react'
import { IMovie } from '@/shared/types'
import { MovieCard } from '@/entities/movie'
import { SkeletonMovieCard } from '@/shared/ui/skeleton'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'

interface IMovieCategoryListProps {
  movies: IMovie[]
  isLoading: boolean
}

export const MovieCategoryList: FC<IMovieCategoryListProps> = ({ movies, isLoading }) => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: { xs: 1, sm: 2 },
        boxSizing: 'border-box'
      }}
    >
      <Grid
        container
        spacing={{ xs: 0, sm: 2, md: 3 }}
        sx={{
          margin: 0,
          width: '100%'
        }}
      >
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <Grid
                key={`skeleton-${i}`}
                size={{ xs: 6, sm: 4, md: 3, lg: 2.4, xl: 2 }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <SkeletonMovieCard />
              </Grid>
            ))
          : movies.map((movie) => (
              <Grid
                key={movie.id}
                size={{ xs: 6, sm: 4, md: 3, lg: 2.4, xl: 2 }}
                sx={{
                  width: 'fit-content',
                  m: '0 auto',
                  transition: 'all 0.3s ease'
                }}
              >
                <MovieCard movie={movie} />
              </Grid>
            ))}
      </Grid>
    </Box>
  )
}
