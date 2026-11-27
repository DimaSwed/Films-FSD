import { Navigate, useLocation, useParams } from 'react-router-dom'

import {
  useCategoryMovies,
  MovieCategoryList,
  MovieCollectionPage,
  MOVIE_CATEGORIES,
  findMovieCategory,
  getMovieCategoryPath,
  getRenamedCategorySlug
} from '@/features/movies'
import {
  InfiniteScrollFooter,
  LoadingErrorState,
  NotFoundState,
  PageMeta,
  ScrollButton
} from '@/shared/ui'

export const CategoryMoviesPage = () => {
  const { categorySlug = '' } = useParams()
  const { search, hash } = useLocation()
  const renamedTo = getRenamedCategorySlug(categorySlug)
  const config = findMovieCategory(categorySlug)

  const {
    data: movies = [],
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch
  } = useCategoryMovies(config?.category)

  if (renamedTo) {
    return <Navigate to={{ pathname: getMovieCategoryPath(renamedTo), search, hash }} replace />
  }

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
          suggestions={MOVIE_CATEGORIES.map(({ slug, title }) => ({
            label: title,
            to: getMovieCategoryPath(slug)
          }))}
          actions={[{ label: 'На главную', to: '/' }]}
        />
      </>
    )
  }

  const { title } = config
  const hasMovies = movies.length > 0

  return (
    <MovieCollectionPage title={title} back={{ to: '/', label: 'Главная' }}>
      <PageMeta
        title={title}
        description={`${title} — подборка фильмов на КиноТрекере: рейтинг, год выхода, жанры.`}
      />
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
    </MovieCollectionPage>
  )
}
