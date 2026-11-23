import { Box, CircularProgress, Fade, Typography } from '@mui/material'

import { MovieCardActions } from '@/widgets/movie-card-actions'
import { useFavoritesList } from '@/features/favorites'
import { MovieGrid, SmallMovieCard } from '@/entities/movie'
import { useSessionId } from '@/entities/user'
import {
  EmptyState,
  InfiniteScrollFooter,
  LoadingErrorState,
  MovieListToolbar,
  PageMeta,
  ScrollButton
} from '@/shared/ui'

export const FavoritesListPage = () => {
  const sessionId = useSessionId()
  const {
    movies,
    query,
    sort,
    handleQueryChange,
    handleSortChange,
    loadedCount,
    isLoadingAll,
    isPending,
    isError,
    isFetchingMore,
    hasNextPage,
    loadMore,
    refetch
  } = useFavoritesList()

  const hasMovies = movies.length > 0
  const hasLoaded = loadedCount > 0
  const isInitialLoading = !!sessionId && isPending
  // Пока загружается весь список, он ещё неполный — приглушаем сетку и блокируем клики.
  const gridSx = {
    opacity: isLoadingAll ? 0.5 : 1,
    pointerEvents: isLoadingAll ? 'none' : 'auto',
    transition: 'opacity 0.2s'
  } as const
  // Панель не прячем на время загрузки и при ошибке: иначе при смене сортировки она на миг
  // исчезает (и закрывается выпадающий список), а после ошибки нечем вернуть прежний порядок.
  const showToolbar = !!sessionId && (hasLoaded || isPending || isError)

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

      {showToolbar && (
        <MovieListToolbar
          query={query}
          sort={sort}
          onQueryChange={handleQueryChange}
          onSortChange={handleSortChange}
        />
      )}

      <LoadingErrorState
        isLoading={isInitialLoading}
        isError={isError && !hasLoaded}
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

      {!!sessionId && !isPending && !isError && !hasLoaded && (
        <Fade in={true}>
          <Box sx={{ mt: 5 }}>
            <EmptyState
              title="Нет фильмов в избранном"
              description="Найдите фильмы и добавьте их в список избранных, чтобы пересмотреть их позже."
            />
          </Box>
        </Fade>
      )}

      {isLoadingAll && (
        <Box display="flex" justifyContent="center" alignItems="center" gap={1.5} mb={3}>
          <CircularProgress size={20} sx={{ color: 'primary.light' }} />
          <Typography variant="body2">Загружаем весь список…</Typography>
        </Box>
      )}

      {/* Если загрузка оборвалась, список неполный — «не найдено» не показываем. */}
      {hasLoaded && !hasMovies && !isLoadingAll && !isError && (
        <Fade in={true}>
          <Box sx={{ mt: 5 }}>
            <EmptyState
              title="Ничего не найдено"
              description="В избранном нет фильмов с таким названием."
            />
          </Box>
        </Fade>
      )}

      {hasMovies && (
        <Fade in={true}>
          <Box mb={4} sx={gridSx}>
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

      {hasLoaded && (
        <InfiniteScrollFooter
          loadedCount={movies.length}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingMore}
          isError={isError}
          onLoadMore={loadMore}
        />
      )}

      <ScrollButton />
    </Box>
  )
}
