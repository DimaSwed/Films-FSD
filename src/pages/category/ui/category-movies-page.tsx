import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import {
  useTrendingMovies,
  useNowPlayingMovies,
  usePopularMovies,
  useUpcomingMovies,
  useTopRatedMovies
} from '@/features/movies'
import { MovieCategoryList } from '@/features/movies'

const CATEGORY_CONFIG = {
  'сейчас-в-тренде': {
    title: 'Сейчас в тренде',
    hook: useTrendingMovies
  },
  'сейчас-в-прокате': {
    title: 'Сейчас в прокате',
    hook: useNowPlayingMovies
  },
  'популярные-в-этом-месяце': {
    title: 'Популярные в этом месяце',
    hook: usePopularMovies
  },
  'самые-ожидаемые-премьеры': {
    title: 'Самые ожидаемые премьеры',
    hook: useUpcomingMovies
  },
  'топ-рейтинговые-фильмы-за-все-время': {
    title: 'Топ рейтинговые фильмы за все время',
    hook: useTopRatedMovies
  }
} as const

export const CategoryMoviesPage = () => {
  const { categorySlug } = useParams()
  const config = CATEGORY_CONFIG[categorySlug as keyof typeof CATEGORY_CONFIG]

  if (!config) {
    return (
      <Typography variant="h5" textAlign={'center'}>
        Категория не найдена
      </Typography>
    )
  }

  const { title, hook } = config
  const { data: movies = [], isLoading } = hook()

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
        {title}
      </Typography>
      <MovieCategoryList movies={movies} isLoading={isLoading} />
    </Box>
  )
}
