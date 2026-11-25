import ViewDayIcon from '@mui/icons-material/ViewDay'
import { Box, Stack, Typography } from '@mui/material'
import { FC } from 'react'

import { ToggleFavoriteButton } from '@/features/favorites'
import { RateMovieButton } from '@/features/rate-movie'
import { ToggleWatchlistButton } from '@/features/watch-list'
import { IMovieDetails, MovieFacts, TrailerButton } from '@/entities/movie'
import { NO_DESCRIPTION_TEXT } from '@/shared/config'

interface IMovieHeroProps {
  movie: IMovieDetails
}

/** Верх страницы фильма: постер, название, описание, факты и действия на фоне кадра. */
export const MovieHero: FC<IMovieHeroProps> = ({ movie }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: { xs: 'center', md: 'flex-start' },
      gap: { xs: 2, md: 4 },
      padding: { xs: '15px', md: '30px' },
      color: 'common.white',
      bgcolor: 'grey.900',
      // Текст белый в обеих темах, поэтому кадр затемнён по всей высоте
      backgroundImage: movie.backgroundImage
        ? `linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.65)), url(${movie.backgroundImage})`
        : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
    <Box
      sx={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: { xs: 220, md: 300 },
        aspectRatio: '2 / 3',
        borderRadius: '10px',
        overflow: 'hidden',
        bgcolor: 'grey.800'
      }}
    >
      {movie.image ? (
        <Box
          component="img"
          src={movie.image}
          alt={`Постер фильма «${movie.title}»`}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <ViewDayIcon sx={{ fontSize: 60, color: 'grey.500' }} />
      )}
    </Box>

    <Box sx={{ flexGrow: 1, minWidth: 0, width: '100%' }}>
      <Typography variant="h2" component="h1" sx={{ overflowWrap: 'anywhere' }}>
        {movie.title}
      </Typography>
      {movie.tagline && (
        <Typography variant="body1" sx={{ mt: 1, fontStyle: 'italic', opacity: 0.8 }}>
          {movie.tagline}
        </Typography>
      )}
      <Typography variant="body1" sx={{ my: 2 }}>
        {movie.description || NO_DESCRIPTION_TEXT}
      </Typography>

      <MovieFacts movie={movie} />

      <Stack
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: 'wrap',
          gap: 2,
          mt: 3,
          // Без входа кнопки неактивны: цвета светлой темы на тёмном кадре не видны
          '& .MuiButton-root.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.6)',
            bgcolor: 'rgba(255, 255, 255, 0.15)'
          }
        }}
      >
        {movie.trailer && <TrailerButton trailer={movie.trailer} title={movie.title} />}
        <ToggleFavoriteButton movieId={movie.id} />
        <ToggleWatchlistButton movieId={movie.id} />
        <RateMovieButton movieId={movie.id} title={movie.title} />
      </Stack>
    </Box>
  </Box>
)
