import { Box, Typography } from '@mui/material'
import { MovieCategory } from '@/widgets'
import {
  useUpcomingMovies,
  useTopRatedMovies,
  usePopularMovies,
  useNowPlayingMovies,
  useTrendingMovies
} from '@/features/movies'
import { ICategory } from '@/features/movies/types/movies.types'

export const HomePage = () => {
  const { data: nowPlayingMovies, isLoading: isLoadingNowPlaying } = useNowPlayingMovies()
  console.log(nowPlayingMovies)
  const { data: popularMovies, isLoading: isLoadingPopular } = usePopularMovies()
  const { data: upcomingMovies, isLoading: isLoadingUpcoming } = useUpcomingMovies()
  const { data: topRatedMovies, isLoading: isLoadingTopRated } = useTopRatedMovies()
  const { data: trendingMovies, isLoading: isLoadingTrending } = useTrendingMovies()

  const categories: ICategory[] = [
    { title: 'Сейчас в тренде', movies: trendingMovies || [], isLoading: isLoadingTrending },
    { title: 'Сейчас в прокате', movies: nowPlayingMovies || [], isLoading: isLoadingNowPlaying },
    { title: 'Популярные в этом месяце', movies: popularMovies || [], isLoading: isLoadingPopular },
    {
      title: 'Самые ожидаемые премьеры',
      movies: upcomingMovies || [],
      isLoading: isLoadingUpcoming
    },
    {
      title: 'Топ рейтинговые фильмы за все время',
      movies: topRatedMovies || [],
      isLoading: isLoadingTopRated
    }
  ]

  return (
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

      {categories.map(({ title, movies, isLoading }) => (
        <MovieCategory key={title} title={title} movies={movies} isLoading={isLoading} />
      ))}
    </Box>
  )
}
