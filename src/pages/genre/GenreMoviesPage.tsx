import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useMoviesByFilters } from '@/features/movies'
import { MovieCategoryList } from '@/features/movies'
import { GENRES_LIST } from '@/shared/constants'

export const GenreMoviesPage = () => {
  const { genreId } = useParams<{ genreId: string }>()
  const genre = GENRES_LIST.find((g) => g.id === Number(genreId))

  const { data: movies = [], isLoading } = useMoviesByFilters({
    include_adult: 'true',
    include_video: 'true',
    sort_by: 'popularity.desc',
    page: 1,
    with_genres: Number(genreId)
  })

  if (!genre) {
    return (
      <Typography variant="h5" textAlign={'center'}>
        Жанр не найден
      </Typography>
    )
  }

  return (
    <Box
      component="main"
      sx={{
        p: { xs: 2, sm: 4 },
        color: 'secondary.contrastText',
        bgcolor: 'background.paper'
      }}
    >
      <Typography variant="h4" mb={{ xs: 0, sm: 3 }} textAlign="center">
        {genre.name}
      </Typography>
      <MovieCategoryList movies={movies} isLoading={isLoading} />
    </Box>
  )
}
