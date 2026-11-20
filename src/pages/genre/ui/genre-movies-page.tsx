import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import {
  useInfiniteMoviesByFilters,
  getGenreMoviesParams,
  MovieCategoryList
} from '@/features/movies'
import { GENRES_LIST } from '@/shared/config'
import {
  InfiniteScrollFooter,
  LoadingErrorState,
  NotFoundState,
  PageMeta,
  ScrollButton
} from '@/shared/ui'

export const GenreMoviesPage = () => {
  const { genreId } = useParams<{ genreId: string }>()
  const genre = GENRES_LIST.find((g) => g.id === Number(genreId))

  const {
    data: movies = [],
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch
  } = useInfiniteMoviesByFilters(getGenreMoviesParams(Number(genreId)), { enabled: !!genre })

  if (!genre) {
    return (
      <>
        <PageMeta title="Жанр не найден" noIndex />
        <NotFoundState
          caption="ЖАНР"
          title="Такой жанр"
          accent="не снят"
          description="Жанра с таким номером в каталоге нет. Зато есть другие — выберите, что посмотреть."
          suggestionsTitle="Жанры каталога"
          suggestions={GENRES_LIST.map(({ id, name }) => ({ label: name, to: `/genre/${id}` }))}
          actions={[
            { label: 'Все жанры', to: '/movies' },
            { label: 'На главную', to: '/' }
          ]}
        />
      </>
    )
  }

  const hasMovies = movies.length > 0

  return (
    <Box
      component="main"
      sx={{
        p: { xs: 2, sm: 4 },
        color: 'secondary.contrastText',
        bgcolor: 'background.paper'
      }}
    >
      <PageMeta
        title={`Фильмы жанра «${genre.name}»`}
        description={`Популярные фильмы жанра «${genre.name}»: рейтинг, год выхода, где посмотреть.`}
      />
      <Typography variant="h4" mb={{ xs: 0, sm: 3 }} textAlign="center">
        {genre.name}
      </Typography>
      <MovieCategoryList movies={movies} isLoading={isLoading} />
      <LoadingErrorState isLoading={false} isError={isError && !hasMovies} retry={refetch} />
      {hasMovies && (
        <InfiniteScrollFooter
          loadedCount={movies.length}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isError={isError}
          onLoadMore={fetchNextPage}
        />
      )}
      <ScrollButton />
    </Box>
  )
}
