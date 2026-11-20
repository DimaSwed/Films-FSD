import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import { useCategoryMovies, MovieCategoryList, type TMovieCategory } from '@/features/movies'
import {
  InfiniteScrollFooter,
  LoadingErrorState,
  NotFoundState,
  PageMeta,
  ScrollButton
} from '@/shared/ui'

const CATEGORY_CONFIG: Record<string, { title: string; category: TMovieCategory }> = {
  'сейчас-в-тренде': { title: 'Сейчас в тренде', category: 'trending' },
  'сейчас-в-прокате': { title: 'Сейчас в прокате', category: 'now-playing' },
  'популярные-в-этом-месяце': { title: 'Популярные в этом месяце', category: 'popular' },
  'самые-ожидаемые-премьеры': { title: 'Самые ожидаемые премьеры', category: 'upcoming' },
  'топ-рейтинговые-фильмы-за-все-время': {
    title: 'Топ рейтинговые фильмы за все время',
    category: 'top-rated'
  }
}

export const CategoryMoviesPage = () => {
  const { categorySlug = '' } = useParams()
  // hasOwnProperty: slug вроде `constructor` не должен находить унаследованные свойства объекта.
  const config = Object.prototype.hasOwnProperty.call(CATEGORY_CONFIG, categorySlug)
    ? CATEGORY_CONFIG[categorySlug]
    : undefined

  const {
    data: movies = [],
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch
  } = useCategoryMovies(config?.category)

  if (!config) {
    return (
      <>
        <PageMeta title="Категория не найдена" noIndex />
        <NotFoundState
          caption="ПОДБОРКА"
          title="Подборка"
          accent="потерялась"
          description="Такой подборки в нашей фильмотеке нет: возможно, ссылка устарела или в адресе опечатка. Выберите одну из существующих."
          suggestionsTitle="Доступные подборки"
          suggestions={Object.entries(CATEGORY_CONFIG).map(([slug, { title }]) => ({
            label: title,
            to: `/category/${slug}`
          }))}
          actions={[{ label: 'На главную', to: '/' }]}
        />
      </>
    )
  }

  const { title } = config
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
        title={title}
        description={`${title} — подборка фильмов на КиноТрекере: рейтинг, год выхода, жанры.`}
      />
      <Typography variant="h4" mb={{ xs: 0, sm: 3 }} textAlign="center">
        {title}
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
