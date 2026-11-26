import { Box, Typography } from '@mui/material'

import {
  MovieCategory,
  MOVIE_CATEGORIES,
  getMovieCategoryPath,
  useUpcomingMovies,
  useTopRatedMovies,
  usePopularMovies,
  useNowPlayingMovies,
  useTrendingMovies,
  type TMovieCategory
} from '@/features/movies'
import { PageMeta } from '@/shared/ui'

export const HomePage = () => {
  // Хуки вызываются по одному: порядок вызова хуков не должен зависеть от списка подборок.
  const queries: Record<TMovieCategory, ReturnType<typeof usePopularMovies>> = {
    trending: useTrendingMovies(),
    'now-playing': useNowPlayingMovies(),
    popular: usePopularMovies(),
    upcoming: useUpcomingMovies(),
    'top-rated': useTopRatedMovies()
  }

  return (
    <>
      <PageMeta />
      <Box
        component="main"
        minHeight={'100%'}
        sx={{
          padding: { xs: '10px', sm: '15px', md: '30px' },
          color: 'secondary.contrastText',
          bgcolor: 'background.paper',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <Typography variant="h3" gutterBottom textAlign={'center'} mb={5}>
          Фильмы
        </Typography>

        {MOVIE_CATEGORIES.map(({ slug, title, category }) => (
          <MovieCategory
            key={slug}
            title={title}
            to={getMovieCategoryPath(slug)}
            movies={queries[category].data ?? []}
            isLoading={queries[category].isLoading}
          />
        ))}
      </Box>
    </>
  )
}
