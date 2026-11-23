import { Box, Typography } from '@mui/material'
import { Fragment } from 'react'

import { TrailerList, useCategoryTrailers } from '@/features/movies'
import {
  EmptyState,
  InfiniteScrollFooter,
  LoadingErrorState,
  PageMeta,
  PageShell,
  ScrollButton
} from '@/shared/ui'

import { getTrailersTabId, TRAILERS_PANEL_ID } from '../config'
import { useTrailersTab } from '../model'

import { TrailersTabs } from './trailers-tabs'

export const TrailersPage = () => {
  const { category, setCategory } = useTrailersTab()
  const {
    items,
    loadedCount,
    isLoading,
    isSuccess,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    retryFailed
  } = useCategoryTrailers(category)

  const hasLoaded = loadedCount > 0
  const isFailed = isError && !hasLoaded

  return (
    <PageShell sx={{ padding: { xs: '10px', sm: '15px', md: '30px' } }}>
      <PageMeta
        title={isFailed ? 'Ошибка загрузки трейлеров' : 'Трейлеры'}
        description="Трейлеры ближайших премьер, фильмов в прокате и популярных картин."
        noIndex={isFailed}
      />
      <Typography variant="h3" component="h1" textAlign="center" gutterBottom>
        Последние трейлеры
      </Typography>

      <TrailersTabs category={category} onChange={setCategory} />

      <Box role="tabpanel" id={TRAILERS_PANEL_ID} aria-labelledby={getTrailersTabId(category)}>
        <LoadingErrorState
          isLoading={isLoading}
          isError={isFailed}
          loadingText="Загружаем трейлеры..."
          errorTitle="Ошибка загрузки трейлеров"
          errorDescription="Не удалось загрузить список трейлеров. Попробуйте позже."
          retry={refetch}
        />

        {isSuccess && items.length === 0 && !hasNextPage && (
          <EmptyState
            title="Трейлеров пока нет"
            description="Для фильмов этой подборки ролики ещё не опубликованы."
          />
        )}

        {/* key: смена вкладки (в том числе по ссылке из сайдбара) останавливает плеер */}
        {hasLoaded && (
          <Fragment key={category}>
            <TrailerList items={items} onRetry={retryFailed} />
            <InfiniteScrollFooter
              loadedCount={loadedCount}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              isError={isError}
              onLoadMore={fetchNextPage}
            />
          </Fragment>
        )}
      </Box>

      <ScrollButton />
    </PageShell>
  )
}
