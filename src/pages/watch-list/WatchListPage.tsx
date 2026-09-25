import { Box, Fade, Typography } from '@mui/material'
import {
  LoadingOrError,
  NoMovies,
  WatchListCard,
  WatchListFilters,
  useRemoveFromWatchList,
  useWatchList
} from '@/features/watch-list'
import { ScrollButton } from '@/shared/ui'
import { useInfiniteScroll } from '@/shared/utils'

export const WatchListPage = () => {
  const {
    visibleMovies,
    selectedGenre,
    selectedYear,
    handleGenreChange,
    handleYearChange,
    handleResetFilters,
    handleScrollEnd,
    isLoading,
    isError
  } = useWatchList()

  const { mutate: removeFromWatchList } = useRemoveFromWatchList()

  const sentinelRef = useInfiniteScroll(handleScrollEnd)

  const hasMovies = visibleMovies.length > 0

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
      <Typography variant="h3" gutterBottom textAlign="center" mb={{ xs: 1, md: 4 }}>
        Список к просмотру
      </Typography>

      <WatchListFilters
        selectedGenre={selectedGenre}
        selectedYear={selectedYear}
        onGenreChange={handleGenreChange}
        onYearChange={handleYearChange}
        onResetFilters={handleResetFilters}
      />

      <LoadingOrError isLoading={isLoading} isError={isError} />

      {!isLoading && !isError && !hasMovies && (
        <Fade in={true}>
          <Box sx={{ mt: 5 }}>
            <NoMovies />
          </Box>
        </Fade>
      )}

      {hasMovies && (
        <Fade in={true}>
          <Box display="flex" flexDirection="column" gap={2} mb={4}>
            {visibleMovies.map((movie) => (
              <WatchListCard
                key={movie.id}
                movie={movie}
                onRemoveFromWatchlist={() => removeFromWatchList(movie.id)}
              />
            ))}
          </Box>
        </Fade>
      )}

      <div ref={sentinelRef} style={{ height: 1 }} />

      <ScrollButton />
    </Box>
  )
}
