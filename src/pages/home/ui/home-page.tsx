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
import { visuallyHidden } from '@/shared/lib'
import { PageMeta } from '@/shared/ui'

import { HomeHero } from './home-hero'

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
      {/* Не `<main>`: страница уже внутри `<main>` из `App` */}
      <Box
        sx={{
          minHeight: '100%',
          px: { xs: 1.5, sm: 2, md: 3.5 },
          pt: { xs: 1.5, sm: 2, md: 3 },
          pb: { xs: 4, md: 6 },
          color: 'text.primary',
          bgcolor: 'background.paper',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            maxWidth: 1680,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 3.5, md: 5 }
          }}
        >
          <Typography variant="h1" sx={visuallyHidden}>
            КиноТрекер: подборки фильмов
          </Typography>

          {/* Без сети баннер не рисуется (запрос на паузе), «Нет соединения» покажет ряд трендов */}
          <HomeHero
            movies={queries.trending.data ?? []}
            isLoading={queries.trending.isPending && !queries.trending.isPaused}
          />

          {MOVIE_CATEGORIES.map(({ slug, title, category }) => (
            <MovieCategory
              key={slug}
              title={title}
              to={getMovieCategoryPath(slug)}
              movies={queries[category].data ?? []}
              isPending={queries[category].isPending}
              isPaused={queries[category].isPaused}
              isError={queries[category].isError}
              isFetching={queries[category].isFetching}
              onRetry={() => void queries[category].refetch()}
            />
          ))}
        </Box>
      </Box>
    </>
  )
}
