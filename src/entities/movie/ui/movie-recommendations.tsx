import { Box } from '@mui/material'
import { FC } from 'react'

import { IMovie } from '@/shared/lib'
import { ScrollRow } from '@/shared/ui'

import { SmallMovieCard } from './small-movie-card'

interface IMovieRecommendationsProps {
  movies: IMovie[]
}

/** Ряд «Похожие фильмы» (рекомендации TMDB). Без данных секция не рисуется. */
export const MovieRecommendations: FC<IMovieRecommendationsProps> = ({ movies }) =>
  movies.length > 0 && (
    <ScrollRow title="Похожие фильмы">
      {movies.map((movie) => (
        <Box component="li" key={movie.id} sx={{ width: { xs: 140, sm: 160 } }}>
          <SmallMovieCard movie={movie} />
        </Box>
      ))}
    </ScrollRow>
  )
