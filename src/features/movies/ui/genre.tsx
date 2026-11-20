import { Box } from '@mui/material'
import React from 'react'

import { useMoviesByFilters, getGenreMoviesParams, IGenreProps } from '../model'

import { MovieCategory } from './movie-category'

export const Genre: React.FC<IGenreProps> = ({ id, title }) => {
  const { data, isLoading } = useMoviesByFilters(getGenreMoviesParams(id))

  return (
    <Box key={title} sx={{ mb: 4 }}>
      <MovieCategory title={title} movies={data || []} isLoading={isLoading} genreId={id} />
    </Box>
  )
}
