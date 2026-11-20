import { Box, Fade, Typography } from '@mui/material'

import { MovieCardActions } from '@/widgets/movie-card-actions'
import { useFavoritesList } from '@/features/favorites'
import { MovieGrid, SmallMovieCard } from '@/entities/movie'
import { useSessionId } from '@/entities/user'
import {
  EmptyState,
  InfiniteScrollFooter,
  LoadingErrorState,
  PageMeta,
  ScrollButton
} from '@/shared/ui'

export const FavoritesListPage = () => {
  const sessionId = useSessionId()
  const {
    data: movies = [],
    isPending,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch
  } = useFavoritesList()

  const hasMovies = movies.length > 0
  const isInitialLoading = !!sessionId && isPending

  return (
    <Box
      component="main"
      minHeight="100%"
      sx={{
        padding: { xs: '10px', sm: '15px', md: '30px' },
        color: 'secondary.contrastText',
        bgcolor: 'background.paper',
        width: '100%'
      }}
    >
      <PageMeta title="Избранное" noIndex />
      <Typography variant="h3" gutterBottom textAlign="center" mb={{ xs: 1, md: 4 }}>
        Список избранного
      </Typography>

      <LoadingErrorState
        isLoading={isInitialLoading}
        isError={isError && !hasMovies}
        retry={refetch}
      />

      {!sessionId && (
        <Box sx={{ mt: 5 }}>
          <EmptyState
            title="Войдите, чтобы увидеть избранное"
            description="Список избранных фильмов доступен после авторизации через TMDB."
          />
        </Box>
      )}

      {!!sessionId && !isPending && !isError && !hasMovies && (
        <Fade in={true}>
          <Box sx={{ mt: 5 }}>
            <EmptyState
              title="Нет фильмов в избранном"
              description="Найдите фильмы и добавьте их в список избранных, чтобы пересмотреть их позже."
            />
          </Box>
        </Fade>
      )}

      {hasMovies && (
        <Fade in={true}>
          <Box mb={4}>
            <MovieGrid>
              {movies.map((movie) => (
                <SmallMovieCard
                  key={movie.id}
                  movie={movie}
                  actions={<MovieCardActions movieId={movie.id} />}
                />
              ))}
            </MovieGrid>
          </Box>
        </Fade>
      )}

      {hasMovies && (
        <InfiniteScrollFooter
          loadedCount={movies.length}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isError={isError}
          onLoadMore={fetchNextPage}
        />
      )}

      <ScrollButton />
    </Box>
  )
}
