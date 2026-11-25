import { Box, Fade, Typography } from '@mui/material'
import { useCallback, useState } from 'react'

import { MarkWatchedButton, RateMovieDialog } from '@/features/rate-movie'
import {
  NoMovies,
  WatchListCards,
  WatchListFilters,
  useRemoveFromWatchListWithUndo,
  useWatchList
} from '@/features/watch-list'
import { IMovie, useInfiniteScroll } from '@/shared/lib'
import {
  EmptyState,
  LoadingErrorState,
  MovieListToolbar,
  PageMeta,
  ScrollButton
} from '@/shared/ui'

export const WatchListPage = () => {
  const {
    visibleMovies,
    expandedIds,
    selectedGenre,
    selectedYear,
    query,
    sort,
    hasActiveFilters,
    totalCount,
    handleToggleDescription,
    handleGenreChange,
    handleYearChange,
    handleQueryChange,
    handleSortChange,
    handleResetFilters,
    handleScrollEnd,
    isLoading,
    isError
  } = useWatchList()

  const removeFromWatchList = useRemoveFromWatchListWithUndo()

  // Окно оценки одно на весь список и не входит в карточки. Иначе при повороте телефона оно бы
  // закрывалось: карточка меняет вид, и React создаёт её заново.
  // После закрытия фильм не сбрасываем, чтобы его название не исчезло раньше, чем само окно.
  const [movieToRate, setMovieToRate] = useState<IMovie | null>(null)
  const [isRatingOpen, setIsRatingOpen] = useState(false)

  const renderActions = useCallback(
    (movie: IMovie) => (
      <MarkWatchedButton
        onClick={() => {
          setMovieToRate(movie)
          setIsRatingOpen(true)
        }}
      />
    ),
    []
  )

  const sentinelRef = useInfiniteScroll(handleScrollEnd)

  const hasMovies = visibleMovies.length > 0
  const hasList = totalCount > 0
  // Панель показываем уже во время загрузки, чтобы она не появлялась позже и не сдвигала список.
  const showControls = hasList || isLoading

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
      <PageMeta title="Список к просмотру" noIndex />
      <Typography variant="h3" gutterBottom textAlign="center" mb={{ xs: 1, md: 4 }}>
        Список к просмотру
      </Typography>

      {/* Без входа или при пустом списке панель не нужна. */}
      {showControls && (
        <>
          <MovieListToolbar
            query={query}
            sort={sort}
            onQueryChange={handleQueryChange}
            onSortChange={handleSortChange}
          />

          <WatchListFilters
            selectedGenre={selectedGenre}
            selectedYear={selectedYear}
            hasActiveFilters={hasActiveFilters}
            onGenreChange={handleGenreChange}
            onYearChange={handleYearChange}
            onResetFilters={handleResetFilters}
          />
        </>
      )}

      <LoadingErrorState
        isLoading={isLoading}
        isError={isError}
        loadingText="Загружаем ваш список просмотра..."
        errorTitle="Ошибка загрузки списка"
        errorDescription="Не удалось загрузить ваш список фильмов к просмотру"
      />

      {!isLoading && !isError && !hasMovies && (
        <Fade in={true}>
          <Box sx={{ mt: 5 }}>
            {hasList ? (
              <EmptyState
                title="Ничего не найдено"
                description="В вашем списке нет фильмов по выбранным условиям. Измените поиск или фильтры."
              />
            ) : (
              <NoMovies />
            )}
          </Box>
        </Fade>
      )}

      {hasMovies && (
        <Fade in={true}>
          <Box display="flex" flexDirection="column" gap={2} mb={4}>
            <WatchListCards
              movies={visibleMovies}
              expandedIds={expandedIds}
              renderActions={renderActions}
              onToggleDescription={handleToggleDescription}
              onRemove={removeFromWatchList}
            />
          </Box>
        </Fade>
      )}

      <div ref={sentinelRef} style={{ height: 1 }} />

      {movieToRate && (
        <RateMovieDialog
          movieId={movieToRate.id}
          title={movieToRate.title}
          isOpen={isRatingOpen}
          onClose={() => setIsRatingOpen(false)}
        />
      )}

      <ScrollButton />
    </Box>
  )
}
