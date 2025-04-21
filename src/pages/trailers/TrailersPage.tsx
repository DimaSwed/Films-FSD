import { Box, CircularProgress, Typography, Card, CardContent } from '@mui/material'
import { useUpcomingMovies } from '@/features/movies'
import { useMovieTrailers } from '@/features/movies'

export const TrailersPage = () => {
  const { data: movies, isLoading, error } = useUpcomingMovies()
  const { data: trailersData } = useMovieTrailers(movies?.map((m) => m.id) || [])

  if (isLoading) {
    return (
      <Box
        sx={{
          color: 'secondary.contrastText',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress sx={{ color: 'primary.light' }} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', width: '100%' }}>
        <Typography variant="h6" color="error" textAlign={'center'}>
          Произошла ошибка при загрузке данных.
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        padding: { xs: '10px', sm: '15px', md: '30px' },
        color: 'secondary.contrastText',
        bgcolor: 'background.paper',
        width: '100%'
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4, width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Последние трейлеры
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: { xs: 'center', sm: 'flex-start' }
          }}
        >
          {movies?.map((movie) => {
            const trailerKey = trailersData?.[movie.id]?.[0]?.key
            return (
              <Box
                key={movie.id}
                sx={{
                  flex: '1 1 calc(100% - 24px)', // для xs
                  maxWidth: {
                    xs: '100%',
                    sm: 'calc(50% - 24px)',
                    md: 'calc(33.33% - 24px)'
                  },
                  display: 'flex'
                }}
              >
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    bgcolor: 'background.default',
                    color: 'secondary.contrastText',
                    borderRadius: 1,
                    boxShadow: 3
                  }}
                >
                  {trailerKey ? (
                    <Box sx={{ position: 'relative', height: 200 }}>
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        title={movie.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ border: 'none', borderRadius: '4px 4px 0 0' }}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'grey.800'
                      }}
                    >
                      <Typography variant="body2" color="primary.contrastText">
                        Трейлер недоступен
                      </Typography>
                    </Box>
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div">
                      {movie.title}
                    </Typography>
                    <Typography variant="body2">{movie.year}</Typography>
                  </CardContent>
                </Card>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
