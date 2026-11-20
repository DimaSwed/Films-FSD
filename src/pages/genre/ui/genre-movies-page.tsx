import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import { useMoviesByFilters, getGenreMoviesParams, MovieCategoryList } from '@/features/movies'
import { GENRES_LIST } from '@/shared/config'
import { PageMeta } from '@/shared/ui'

export const GenreMoviesPage = () => {
  const { genreId } = useParams<{ genreId: string }>()
  const genre = GENRES_LIST.find((g) => g.id === Number(genreId))

  const { data: movies = [], isLoading } = useMoviesByFilters(
    getGenreMoviesParams(Number(genreId)),
    { enabled: !!genre }
  )

  if (!genre) {
    return (
      <>
        <PageMeta title="Жанр не найден" noIndex />
        <Typography variant="h5" textAlign={'center'}>
          Жанр не найден
        </Typography>
      </>
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
      <PageMeta
        title={`Фильмы жанра «${genre.name}»`}
        description={`Популярные фильмы жанра «${genre.name}»: рейтинг, год выхода, где посмотреть.`}
      />
      <Typography variant="h4" mb={{ xs: 0, sm: 3 }} textAlign="center">
        {genre.name}
      </Typography>
      <MovieCategoryList movies={movies} isLoading={isLoading} />
    </Box>
  )
}
