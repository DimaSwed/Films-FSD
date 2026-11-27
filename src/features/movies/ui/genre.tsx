import { Box } from '@mui/material'
import React from 'react'

import { useMoviesByFilters, getGenreMoviesParams, IGenreProps } from '../model'

import { MovieCategory } from './movie-category'

export const Genre: React.FC<IGenreProps> = ({ id, title }) => {
  const { data, isPending, isPaused, isError, isFetching, refetch } = useMoviesByFilters(
    getGenreMoviesParams(id)
  )

  return (
    <Box sx={{ mb: { xs: 3.5, md: 5 } }}>
      <MovieCategory
        title={title}
        movies={data ?? []}
        isPending={isPending}
        isPaused={isPaused}
        isError={isError}
        isFetching={isFetching}
        onRetry={() => void refetch()}
        to={`/genre/${id}`}
      />
    </Box>
  )
}
