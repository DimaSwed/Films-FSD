import { FC } from 'react'

import { MovieGrid, SmallMovieCard, SmallMovieCardSkeleton } from '@/entities/movie'
import { IMovie } from '@/shared/lib'

interface IMovieCategoryListProps {
  movies: IMovie[]
  isLoading: boolean
}

const SKELETON_COUNT = 12

/** Сетка подборки или жанра: те же карточки, что в рядах главной и в личных списках. */
export const MovieCategoryList: FC<IMovieCategoryListProps> = ({ movies, isLoading }) => (
  <MovieGrid>
    {isLoading
      ? Array.from({ length: SKELETON_COUNT }, (_, index) => <SmallMovieCardSkeleton key={index} />)
      : movies.map((movie) => <SmallMovieCard key={movie.id} movie={movie} />)}
  </MovieGrid>
)
