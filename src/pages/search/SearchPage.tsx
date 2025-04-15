// src/pages/search/page.tsx
import { Box, Typography } from '@mui/material'
import { SearchFilters } from '@/features/search-movie/ui/search-filters'

export const SearchPage = () => {
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
      <Typography variant="h3" gutterBottom textAlign={'center'} mb={2}>
        Поиск фильма
      </Typography>
      <SearchFilters />
    </Box>
  )
}
