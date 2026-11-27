import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Box, Button, Typography } from '@mui/material'
import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface IMovieCollectionPageProps {
  title: string
  /** Куда ведёт ссылка над заголовком: откуда обычно приходят на страницу. */
  back: { to: string; label: string }
  children: ReactNode
}

/**
 * Каркас страницы подборки или жанра: ссылка назад, заголовок страницы (`h1`) и содержимое
 * в той же ширине, что главная.
 */
export const MovieCollectionPage: FC<IMovieCollectionPageProps> = ({ title, back, children }) => (
  // Не `<main>`: страница уже внутри `<main>` из `App`
  <Box
    sx={{
      minHeight: '100%',
      px: { xs: 1.5, sm: 2, md: 3.5 },
      pt: { xs: 1.5, md: 2.5 },
      pb: { xs: 4, md: 6 },
      color: 'text.primary',
      bgcolor: 'background.paper'
    }}
  >
    <Box sx={{ maxWidth: 1680, mx: 'auto' }}>
      <Button
        component={Link}
        to={back.to}
        size="small"
        color="inherit"
        startIcon={<ChevronLeftIcon />}
        sx={{
          ml: -1,
          minHeight: 40,
          borderRadius: '999px',
          textTransform: 'none',
          fontWeight: 500,
          color: 'text.secondary',
          '& .MuiButton-startIcon': { mr: 0.25 },
          '&:hover': { color: 'text.primary' }
        }}
      >
        {back.label}
      </Button>

      <Typography
        variant="h3"
        component="h1"
        sx={{
          mt: 0.5,
          mb: { xs: 2, md: 3 },
          fontWeight: 700,
          letterSpacing: '-0.01em',
          textWrap: 'balance'
        }}
      >
        {title}
      </Typography>

      {children}
    </Box>
  </Box>
)
