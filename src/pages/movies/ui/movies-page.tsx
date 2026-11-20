import { Box, Typography } from '@mui/material'

import { Genre } from '@/features/movies'
import { GENRES_LIST } from '@/shared/config'
import { PageMeta } from '@/shared/ui'

export const MoviesPage = () => {
  return (
    <>
      <PageMeta
        title="Фильмы по жанрам"
        description="Подборки популярных фильмов по жанрам: боевики, комедии, драмы, ужасы, фантастика и другие."
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
        <Typography variant="h3" gutterBottom textAlign={'center'} mb={5}>
          Фильмы
        </Typography>
        {GENRES_LIST.map((genre) => (
          <Genre key={genre.id} id={genre.id} title={genre.name} />
        ))}
      </Box>
    </>
  )
}
