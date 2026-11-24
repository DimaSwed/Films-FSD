import { Stack } from '@mui/material'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'

import {
  MovieCast,
  MovieRecommendations,
  WatchProvidersSection,
  useMovie,
  useWatchProviders
} from '@/entities/movie'
import { LoadingErrorState, PageMeta, PageShell } from '@/shared/ui'

import { parseMovieId } from '../lib'

import { MovieHero } from './movie-hero'
import { MovieNotFound } from './movie-not-found'

export const MoviePage = () => {
  const { id } = useParams<{ id: string }>()
  const movieId = parseMovieId(id)
  const { data: movie, isError, isPaused, refetch } = useMovie(movieId)
  const {
    data: providers,
    isLoading: isProvidersLoading,
    isError: isProvidersError
  } = useWatchProviders(movieId)

  if (movieId === undefined || movie === null) return <MovieNotFound />

  if (!movie) {
    // Без сети запрос ждёт (не ошибка) и продолжится сам, поэтому кнопки повтора нет
    const errorTitle = isPaused ? 'Нет соединения' : 'Ошибка загрузки фильма'
    const isFailed = isError || isPaused

    return (
      <PageShell centered>
        {isFailed && <PageMeta title={errorTitle} noIndex />}
        <LoadingErrorState
          isLoading={!isFailed}
          isError={isFailed}
          loadingText="Загружаем информацию о фильме..."
          errorTitle={errorTitle}
          errorDescription={
            isPaused
              ? 'Загрузим фильм, как только появится интернет.'
              : 'Не удалось загрузить информацию о фильме. Попробуйте ещё раз.'
          }
          retry={isPaused ? undefined : refetch}
        />
      </PageShell>
    )
  }

  return (
    <PageShell>
      <PageMeta
        title={movie.year ? `${movie.title} (${movie.year})` : movie.title}
        description={movie.description || undefined}
        image={movie.image || undefined}
        type="video.movie"
      />
      {/* key: переход к похожему фильму закрывает трейлер и возвращает ряды в начало */}
      <Fragment key={movie.id}>
        <MovieHero movie={movie} />

        <Stack sx={{ gap: 4, padding: { xs: '15px', md: '30px' } }}>
          <WatchProvidersSection
            providers={providers}
            isLoading={isProvidersLoading}
            isError={isProvidersError}
          />
          <MovieCast cast={movie.cast} />
          <MovieRecommendations movies={movie.recommendations} />
        </Stack>
      </Fragment>
    </PageShell>
  )
}
