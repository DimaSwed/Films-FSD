// import { Box, Fade, Pagination, Typography } from '@mui/material'
// import {
//   LoadingOrError,
//   NoMovies,
//   WatchListCard,
//   WatchListFilters,
//   useRemoveFromWatchList,
//   useWatchList
// } from '@/features/watch-list'
// import { ScrollButton } from '@/shared/ui'

// export const WatchListPage = () => {
//   const {
//     filteredMovies,
//     selectedGenre,
//     selectedYear,
//     currentPage,
//     totalPages,
//     handleGenreChange,
//     handleYearChange,
//     handleResetFilters,
//     handlePageChange,
//     isLoading,
//     isError,
//     error
//   } = useWatchList()

//   const { mutate: removeFromWatchList } = useRemoveFromWatchList()

//   const hasMovies = filteredMovies.length > 0

//   return (
//     <Box
//       component="main"
//       minHeight={'100%'}
//       sx={{
//         padding: { xs: '10px', sm: '15px', md: '30px' },
//         color: 'secondary.contrastText',
//         bgcolor: 'background.paper',
//         width: '100%',
//         overflow: 'hidden'
//       }}
//     >
//       <Typography variant="h3" gutterBottom textAlign="center" mb={5}>
//         Список к просмотру
//       </Typography>

//       <WatchListFilters
//         selectedGenre={selectedGenre}
//         selectedYear={selectedYear}
//         onGenreChange={handleGenreChange}
//         onYearChange={handleYearChange}
//         onResetFilters={handleResetFilters}
//       />

//       {isLoading || isError ? (
//         <LoadingOrError isLoading={isLoading} isError={isError} error={error} />
//       ) : (
//         <>
//           {hasMovies ? (
//             <Fade in={true}>
//               <Box display="flex" flexDirection="column" gap={2} mb={4}>
//                 {filteredMovies.map((movie) => (
//                   <WatchListCard
//                     key={movie.id}
//                     movie={movie}
//                     onRemoveFromWatchlist={() => removeFromWatchList(movie.id)}
//                   />
//                 ))}
//               </Box>
//             </Fade>
//           ) : (
//             <Fade in={true}>
//               <Box sx={{ mt: 5 }}>
//                 <NoMovies />
//               </Box>
//             </Fade>
//           )}

//           {hasMovies && (
//             <Fade in={true}>
//               <Box display="flex" justifyContent="center" m={4}>
//                 <Pagination
//                   count={totalPages}
//                   page={currentPage}
//                   onChange={(_, page) => handlePageChange(page)}
//                   color="primary"
//                   size="small"
//                 />
//               </Box>
//             </Fade>
//           )}
//         </>
//       )}

//       <ScrollButton />
//     </Box>
//   )
// }
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
    error
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

  const hasMovies = visibleMovies.length > 0

  return (
    <Box
      component="main"
      minHeight="100%"
      sx={{
        padding: { xs: '10px', sm: '15px', md: '30px' },
        color: 'secondary.contrastText',
        bgcolor: 'background.paper',
        width: '100%',
        overflow: 'hidden'
      }}
    >
      <Typography variant="h3" gutterBottom textAlign="center" mb={5}>
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
            <Fade in={true}>
              <Box sx={{ mt: 5 }}>
                <NoMovies />
              </Box>
            </Fade>
          )}

          <div ref={bottomRef} style={{ height: 1 }} />
        </>
      )}

      <ScrollButton />
    </Box>
  )
}
