import { Box, CircularProgress, Fade, Typography } from '@mui/material'
import { FC, ReactNode } from 'react'

import { MovieGrid, SmallMovieCard } from '@/entities/movie'
import { useSessionId } from '@/entities/user'
import { IMovie, IMovieSortOption, TAccountMovieList } from '@/shared/lib'
import {
  EmptyState,
  InfiniteScrollFooter,
  LoadingErrorState,
  MovieListToolbar,
  ScrollButton
} from '@/shared/ui'

interface IMessage {
  title: string
  description: string
}

interface IAccountMovieListProps {
  title: string
  list: TAccountMovieList
  sortOptions?: readonly IMovieSortOption[]
  renderActions: (movie: IMovie) => ReactNode
  /** Главное действие поверх постера (в избранном — «убрать из избранного»). */
  renderPosterAction?: (movie: IMovie) => ReactNode
  /** Пользователь не вошёл. */
  signedOutMessage: IMessage
  /** Список пуст. */
  emptyMessage: IMessage
  /** В списке нет фильмов с таким названием. */
  notFoundText: string
}

/** Страница списка из аккаунта TMDB: панель поиска и сортировки, сетка и все состояния загрузки. */
export const AccountMovieList: FC<IAccountMovieListProps> = ({
  title,
  list,
  sortOptions,
  renderActions,
  renderPosterAction,
  signedOutMessage,
  emptyMessage,
  notFoundText
}) => {
  const sessionId = useSessionId()
  const { movies, loadedCount, isLoadingAll, isPending, isError } = list

  const hasMovies = movies.length > 0
  const hasLoaded = loadedCount > 0
  const isInitialLoading = !!sessionId && isPending
  // Пока загружается весь список, он ещё неполный — приглушаем сетку и блокируем клики.
  const gridSx = {
    opacity: isLoadingAll ? 0.5 : 1,
    pointerEvents: isLoadingAll ? 'none' : 'auto',
    transition: 'opacity 0.2s'
  } as const
  // Панель не прячем на время загрузки и при ошибке: иначе при смене сортировки она на миг
  // исчезает (и закрывается выпадающий список), а после ошибки нечем вернуть прежний порядок.
  const showToolbar = !!sessionId && (hasLoaded || isPending || isError)

  return (
    <Box
      component="main"
      minHeight="100%"
      sx={{
        padding: { xs: '10px', sm: '15px', md: '30px' },
        color: 'secondary.contrastText',
        bgcolor: 'background.paper',
        width: '100%'
      }}
    >
      <Typography variant="h3" gutterBottom textAlign="center" mb={{ xs: 1, md: 4 }}>
        {title}
      </Typography>

      {showToolbar && (
        <MovieListToolbar
          query={list.query}
          sort={list.sort}
          sortOptions={sortOptions}
          onQueryChange={list.handleQueryChange}
          onSortChange={list.handleSortChange}
        />
      )}

      <LoadingErrorState
        isLoading={isInitialLoading}
        isError={isError && !hasLoaded}
        retry={list.refetch}
      />

      {!sessionId && (
        <Box sx={{ mt: 5 }}>
          <EmptyState {...signedOutMessage} />
        </Box>
      )}

      {!!sessionId && !isPending && !isError && !hasLoaded && (
        <Fade in={true}>
          <Box sx={{ mt: 5 }}>
            <EmptyState {...emptyMessage} />
          </Box>
        </Fade>
      )}

      {isLoadingAll && (
        <Box display="flex" justifyContent="center" alignItems="center" gap={1.5} mb={3}>
          <CircularProgress size={20} sx={{ color: 'primary.light' }} />
          <Typography variant="body2">Загружаем весь список…</Typography>
        </Box>
      )}

      {/* Если загрузка оборвалась, список неполный — «не найдено» не показываем. */}
      {hasLoaded && !hasMovies && !isLoadingAll && !isError && (
        <Fade in={true}>
          <Box sx={{ mt: 5 }}>
            <EmptyState title="Ничего не найдено" description={notFoundText} />
          </Box>
        </Fade>
      )}

      {hasMovies && (
        <Fade in={true}>
          <Box mb={4} sx={gridSx}>
            <MovieGrid>
              {movies.map((movie) => (
                <SmallMovieCard
                  key={movie.id}
                  movie={movie}
                  actions={renderActions(movie)}
                  posterAction={renderPosterAction?.(movie)}
                />
              ))}
            </MovieGrid>
          </Box>
        </Fade>
      )}

      {hasLoaded && (
        <InfiniteScrollFooter
          loadedCount={movies.length}
          hasNextPage={list.hasNextPage}
          isFetchingNextPage={list.isFetchingMore}
          isError={isError}
          onLoadMore={list.loadMore}
        />
      )}

      <ScrollButton />
    </Box>
  )
}
