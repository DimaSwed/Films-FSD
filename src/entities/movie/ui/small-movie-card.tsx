import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'
import ViewDayIcon from '@mui/icons-material/ViewDay'
import { IMovie } from '@/shared/lib'

interface IMovieCardProps {
  movie: IMovie
  /** Слот действий (избранное, к просмотру и т. д.) — собирается на уровне страницы/виджета. */
  actions?: ReactNode
}

const clampLines = (lines: number) => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: lines,
  overflow: 'hidden'
})

export const SmallMovieCard: FC<IMovieCardProps> = ({ movie, actions }) => {
  const ratingColor = movie.rating < 7 ? 'warning.main' : 'success.main'
  const meta = [movie.year || null, movie.genre].filter(Boolean).join(' · ')

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.paper',
        borderRadius: '15px',
        overflow: 'hidden',
        border: '1px solid #444',
        transition: 'transform 0.3s ease',
        // Масштабирование только для устройств с реальным hover — на тач-экране оно «залипает» после тапа
        '@media (hover: hover)': {
          '&:hover': { transform: 'scale(1.03)' }
        }
      }}
    >
      <CardActionArea
        component={Link}
        to={`/movie/${movie.id}`}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <Box sx={{ position: 'relative', aspectRatio: '2 / 3', bgcolor: 'action.hover' }}>
          {movie.image ? (
            <CardMedia
              component="img"
              image={movie.image}
              alt={movie.title}
              loading="lazy"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ViewDayIcon sx={{ width: 60, height: 60, color: 'grey' }} />
            </Box>
          )}

          {movie.rating > 0 && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                px: 1.5,
                py: '2px',
                fontWeight: 'bold',
                color: 'common.white',
                bgcolor: ratingColor,
                borderRadius: '0 0 0 10px'
              }}
            >
              {movie.rating.toFixed(1)}
            </Box>
          )}
        </Box>

        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Typography
            variant="body2"
            fontWeight="bold"
            color="secondary.contrastText"
            sx={{ ...clampLines(2), minHeight: '2.6em' }}
          >
            {movie.title}
          </Typography>
          {meta && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ ...clampLines(1), display: '-webkit-box' }}
            >
              {meta}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>

      {actions && (
        <CardActions sx={{ justifyContent: 'space-between', px: 1, py: 0.5 }}>
          {actions}
        </CardActions>
      )}
    </Card>
  )
}
