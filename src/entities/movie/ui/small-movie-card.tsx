import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined'
import StarIcon from '@mui/icons-material/Star'
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'
import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { clampLines, IMovie, isGoodRating } from '@/shared/lib'

import { smallMovieCardStyles as styles } from './small-movie-card.styles'

interface IMovieCardProps {
  movie: IMovie
  /** Слот действий под карточкой (избранное, к просмотру и т. д.) — собирается на уровне страницы/виджета. */
  actions?: ReactNode
  /**
   * Одно главное действие поверх постера, в правом верхнем углу (например, «убрать из избранного»).
   * Стоит вне ссылки на фильм, чтобы не получилась кнопка внутри ссылки.
   */
  posterAction?: ReactNode
}

export const SmallMovieCard: FC<IMovieCardProps> = ({ movie, actions, posterAction }) => {
  const hasRating = movie.rating > 0
  const rating = movie.rating.toFixed(1)
  const mainGenre = movie.genre.split(', ')[0]
  const meta = [movie.year || null, mainGenre].filter(Boolean).join(' · ')
  const linkLabel = [movie.title, meta, hasRating && `рейтинг TMDB ${rating}`]
    .filter(Boolean)
    .join(', ')

  return (
    <Card component="article" sx={styles.root}>
      <CardActionArea
        component={Link}
        to={`/movie/${movie.id}`}
        aria-label={linkLabel}
        sx={styles.link}
      >
        <Box sx={styles.posterFrame}>
          {movie.image ? (
            <CardMedia
              component="img"
              image={movie.image}
              alt=""
              loading="lazy"
              className="small-movie-card__poster"
              sx={styles.poster}
            />
          ) : (
            <Box sx={styles.noPoster}>
              <MovieOutlinedIcon sx={{ fontSize: 48 }} />
              <Typography variant="caption">Нет постера</Typography>
            </Box>
          )}

          {hasRating && (
            <Box sx={styles.rating}>
              <StarIcon
                sx={{
                  fontSize: 16,
                  color: isGoodRating(movie.rating) ? 'success.light' : 'warning.light'
                }}
              />
              {rating}
            </Box>
          )}
        </Box>

        <CardContent sx={styles.content}>
          <Typography
            variant="body2"
            title={movie.title}
            sx={{ ...styles.title, ...clampLines(2) }}
          >
            {movie.title}
          </Typography>
          {meta && (
            <Typography variant="caption" sx={{ ...styles.meta, ...clampLines(1) }}>
              {meta}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>

      {posterAction && <Box sx={styles.posterAction}>{posterAction}</Box>}

      {actions && (
        <CardActions disableSpacing sx={styles.actions}>
          {actions}
        </CardActions>
      )}
    </Card>
  )
}
