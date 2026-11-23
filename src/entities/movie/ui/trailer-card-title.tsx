import { Link as MuiLink, Typography } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { IMovie } from '@/shared/lib'

interface ITrailerCardTitleProps {
  movie: IMovie
  meta: string
}

/** Название со ссылкой на фильм и строка под ним. */
export const TrailerCardTitle: FC<ITrailerCardTitleProps> = ({ movie, meta }) => (
  <>
    <MuiLink
      component={Link}
      to={`/movie/${movie.id}`}
      variant="h6"
      color="inherit"
      underline="hover"
      sx={{ display: 'block', overflowWrap: 'anywhere' }}
    >
      {movie.title}
    </MuiLink>
    <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.75 }}>
      {meta}
    </Typography>
  </>
)
