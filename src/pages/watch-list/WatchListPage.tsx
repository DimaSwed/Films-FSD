import { Box, Pagination, Typography } from '@mui/material'

import { LoadingOrError, NoMovies, WatchListCard } from '@/features/watch-list'
import { WatchListFilters } from '@/features/watch-list/'
import { useRemoveFromWatchList, useWatchList } from '@/features/watch-list'

export const WatchListPage = () => {
  const {
    filteredMovies,
    selectedGenre,
    selectedYear,
    currentPage,
    totalPages,
    handleGenreChange,
    handleYearChange,
    handleResetFilters,
    handlePageChange,
    isLoading,
    isError,
    error
  } = useWatchList()

  const { mutate: removeFromWatchList } = useRemoveFromWatchList()

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
        Список к просмотру
      </Typography>

      <WatchListFilters
        selectedGenre={selectedGenre}
        selectedYear={selectedYear}
        onGenreChange={handleGenreChange}
        onYearChange={handleYearChange}
        onResetFilters={handleResetFilters}
      />

      {isLoading || isError ? (
        <LoadingOrError isLoading={isLoading} isError={isError} error={error} />
      ) : filteredMovies.length > 0 ? (
        <>
          <Box display="flex" flexDirection="column" gap={2} mb={4}>
            {filteredMovies.map((movie) => (
              <WatchListCard
                key={movie.id}
                movie={movie}
                onRemoveFromWatchlist={() => removeFromWatchList(movie.id)}
              />
            ))}
          </Box>

          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => handlePageChange(page)}
              color="primary"
              size="large"
            />
          </Box>
        </>
      ) : (
        <Box sx={{ mt: 5 }}>
          <NoMovies />
        </Box>
      )}
    </Box>
  )
}
