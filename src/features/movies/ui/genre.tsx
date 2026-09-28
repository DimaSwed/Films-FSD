import { Box } from '@mui/material'
import React from 'react'

import { useMoviesByFilters, IGenreProps } from '../model'

import { MovieCategory } from './movie-category'

export const Genre: React.FC<IGenreProps> = ({ id, title }) => {
  const { data, isLoading } = useMoviesByFilters({
    include_adult: 'true',
    include_video: 'true',
    sort_by: 'popularity.desc',
    primary_release_year: '2025',
    certification_country: 'Россия',
    page: 1,
    with_genres: id
  })

  return (
    <Box key={title} sx={{ mb: 4 }}>
      <MovieCategory title={title} movies={data || []} isLoading={isLoading} genreId={id} />
    </Box>
  )
}
