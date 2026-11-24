// src/pages/search/page.tsx
import { Box, Typography } from '@mui/material'

import { MovieCardActions } from '@/widgets/movie-card-actions'
import { SearchFilters } from '@/features/search-movie'
import { PageMeta, ScrollButton } from '@/shared/ui'

export const SearchPage = () => {
  return (
    <>
      <PageMeta
        title="Поиск фильмов"
        description="Поиск фильмов по названию, жанру, году и стране, сортировка по рейтингу и дате выхода."
      />
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
        <Typography variant="h3" gutterBottom textAlign={'center'} mb={2}>
          Поиск фильма
        </Typography>
        <SearchFilters renderMovieActions={(movie) => <MovieCardActions movie={movie} />} />
        <ScrollButton />
      </Box>
    </>
  )
}
