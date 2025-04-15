import { Box, Typography } from '@mui/material'
import { Genre } from '@/features/movies/ui/genre'
import { GENRES_LIST } from '@/shared/constants/constants'

export const MoviesPage = () => {
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
      {GENRES_LIST.map((genre) => (
        <Genre key={genre.id} id={genre.id} title={genre.name} />
      ))}
    </Box>
  )
}
