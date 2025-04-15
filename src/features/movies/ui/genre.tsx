import React from 'react'
import { Box } from '@mui/material'
import { useMoviesByFilters } from '@/features/movies/'
import { MovieCategory } from '@/features/movies/'
import { IGenreProps } from '@/features/movies/'

export const Genre: React.FC<IGenreProps> = ({ id, title }) => {
  const { data, isLoading } = useMoviesByFilters({
    include_adult: 'true',
    include_video: 'true',
    sort_by: 'popularity.desc',
    primary_release_year: '2024',
    certification_country: 'Россия',
    page: 1,
    with_genres: id
  })

  // console.log(' useMoviesByFilters >>>', data)

  return (
    <Box key={title} sx={{ mb: 4 }}>
      <MovieCategory title={title} movies={data || []} isLoading={isLoading} />
    </Box>
  )
}
