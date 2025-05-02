import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  CardMedia,
  Card,
  CardContent,
  CardActionArea
} from '@mui/material'
import { IMovie } from '@/shared/types'
import { ToggleWatchlistButton } from '@/features/watch-list'
import { FavoriteToggleIcon } from '@/shared/ui/favorite-toggle-icon'

interface IMovieCardProps {
  movie: IMovie
}

export const SmallMovieCard: FC<IMovieCardProps> = ({ movie }) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  const handleMovieSelect = (id: number) => {
    navigate(`/movie/${id}`)
  }

  const ratingColor = movie.rating < 7 ? 'warning.main' : 'success.main'

  return (
    <Card
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: '15px',
        overflow: 'hidden',
        border: '1px solid #444',
        position: 'relative',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)'
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardActionArea>
        {movie.image && (
          <CardMedia
            component="img"
            image={movie.image}
            alt={movie.title}
            sx={{
              objectFit: 'cover',
              borderRadius: '15px'
            }}
          />
        )}
      </CardActionArea>
      {isHovered && (
        <CardContent
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: 'background.paper',
            p: 2,
            borderTop: '1px solid #444',
            opacity: 1,
            color: 'secondary.contrastText',
            transform: 'translateY(0)',
            transition: 'opacity 0.3s ease, transform 0.3s ease'
          }}
        >
          <Typography sx={{ mb: 1, color: ratingColor, fontWeight: 'bold' }}>
            Рейтинг: {movie?.rating.toFixed(1)}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
            {movie.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Год: {movie.year}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Жанр: {movie.genre}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
            <FavoriteToggleIcon movieId={movie.id} size="small" />
            <ToggleWatchlistButton movieId={movie.id} />
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 1, width: '100%' }}
            onClick={() => handleMovieSelect(movie.id)}
          >
            Подробнее
          </Button>
        </CardContent>
      )}
    </Card>
  )
}
