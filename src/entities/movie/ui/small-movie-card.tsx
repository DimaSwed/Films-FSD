import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  IconButton,
  CardMedia,
  Card,
  CardContent,
  CardActionArea
} from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { useAddToWatchlist } from '@/features/movie'
import { IMovie } from '@/shared/types/common.types'

interface IMovieCardProps {
  movie: IMovie
}

export const SmallMovieCard: FC<IMovieCardProps> = ({ movie }) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { mutate: addToWatchlist, isPending, isError } = useAddToWatchlist()

  const handleAddToWatchlist = () => {
    addToWatchlist(movie.id, {
      onSuccess: () => setIsFavorite(true)
    })
  }

  const handleMovieSelect = (id: number) => {
    navigate(`/movie/${id}`)
  }

  const handleFavoriteToggle = () => setIsFavorite(!isFavorite)

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

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <IconButton onClick={handleFavoriteToggle}>
              {isFavorite ? (
                <Favorite sx={{ color: 'red' }} />
              ) : (
                <FavoriteBorder sx={{ color: 'grey' }} />
              )}
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 1, textAlign: 'center' }}
              onClick={handleAddToWatchlist}
              disabled={isPending} // Делаем кнопку неактивной во время загрузки
            >
              {isPending ? 'Добавление ...' : 'Добавить в список просмотра'}
            </Button>
            {isError && (
              <Typography color="error" variant="body2">
                Ошибка при добавлении
              </Typography>
            )}
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
