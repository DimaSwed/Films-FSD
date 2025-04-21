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
import { useEffect, useRef } from 'react'

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
    isError,
    error,
    isFetched
  } = useWatchList()

  const { mutate: removeFromWatchList } = useRemoveFromWatchList()

  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const currentRef = bottomRef.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          handleScrollEnd()
        }
      },
      { threshold: 1.0 }
    )

    observer.observe(currentRef)

    return () => {
      observer.unobserve(currentRef)
    }
  }, [handleScrollEnd])

  const hasMovies = !isLoading && visibleMovies.length > 0

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

      {isLoading ? (
        <LoadingOrError isLoading={isLoading} isError={false} />
      ) : isError ? (
        <LoadingOrError isLoading={false} isError={true} error={error} />
      ) : isFetched && !visibleMovies.length ? ( // Добавлено условие
        <Fade in={true}>
          <Box sx={{ mt: 5 }}>
            <NoMovies />
          </Box>
        </Fade>
      ) : (
        <>
          {hasMovies ? (
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
          ) : (
            !isLoading &&
            isFetched &&
            visibleMovies.length === 0 && (
              <Fade in={true}>
                <Box sx={{ mt: 5 }}>
                  <NoMovies />
                </Box>
              </Fade>
            )
          )}

          <div ref={bottomRef} style={{ height: 1 }} />
        </>
      )}

      <ScrollButton />
    </Box>
  )
}
