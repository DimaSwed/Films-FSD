// src/entities/movie/ui/MovieCard.tsx
import { FC } from 'react'
import { ViewDay } from '@mui/icons-material'
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Button
} from '@mui/material'
import { Link } from 'react-router-dom'
import { IMovie } from '@/shared/types/common.types'

interface MovieCardProps {
  movie: IMovie
}

export const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  return (
    <Box
      sx={{
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)'
        }
      }}
    >
      <Card
        sx={{
          height: '225px',
          width: '150px',
          borderRadius: '10px',
          position: 'relative',
          textAlign: 'center',
          margin: { xs: '0 auto', sm: '0' }
        }}
      >
        <CardActionArea>
          {movie.poster_path ? (
            <Link to={`/movie/${movie.id}`}>
              <CardMedia
                component="img"
                image={`${import.meta.env.VITE_IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                sx={{
                  color: 'secondary.contrastText',
                  width: '100%',
                  height: '225px',
                  margin: '0 auto'
                }}
              />
            </Link>
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '225px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ViewDay
                sx={{
                  width: '60px',
                  height: '60px',
                  margin: '0 auto',
                  color: 'grey'
                }}
              />
            </Box>
          )}
          {movie?.rating && (
            <Box
              sx={{
                position: 'absolute',
                fontWeight: 'bold',
                top: 0,
                right: 0,
                backgroundColor: movie?.rating < 7 ? 'orange' : 'green',
                color: 'white',
                padding: '2px 12px',
                borderRadius: '0 10px 0 10px'
              }}
            >
              {movie?.rating.toFixed(1)}
            </Box>
          )}
        </CardActionArea>
      </Card>
      <CardContent
        sx={{
          padding: '0px',
          maxWidth: { xs: 'auto', sm: '150px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography
          variant="body2"
          color="secondary.contrastText"
          fontWeight={'bold'}
          fontSize="16px"
          component="p"
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'center',
            height: '45px'
          }}
        >
          {movie.title}
        </Typography>
        <Typography variant="body2" color="secondary.contrastText" component="p">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : '-'}
        </Typography>

        <Link to={`/movie/${movie.id}`}>
          <Button variant="contained" size="small" sx={{ mt: '3px' }}>
            Подробнее
          </Button>
        </Link>
      </CardContent>
    </Box>
  )
}
