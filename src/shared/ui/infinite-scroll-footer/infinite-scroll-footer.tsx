import { Box, Button, CircularProgress } from '@mui/material'
import { useCallback } from 'react'

import { useInfiniteScroll } from '../../lib'

/**
 * Сколько фильмов подгружается автоматически (≈ 15 страниц TMDB по 20). Дальше — только по кнопке
 * «Показать ещё»: без этого длинная прокрутка раздувает DOM и тормозит телефон.
 */
const AUTO_LOAD_LIMIT = 300

interface IInfiniteScrollFooterProps {
  /** Сколько элементов уже показано — по нему определяется, пора ли переходить на кнопку. */
  loadedCount: number
  hasNextPage: boolean
  isFetchingNextPage: boolean
  /** Ошибка запроса. Пока она есть, автоподгрузка остановлена — вместо неё кнопка «Попробовать снова» (прячется на время повтора: у TanStack Query `isError` не сбрасывается, пока идёт повторный запрос). */
  isError: boolean
  onLoadMore: () => void
}

/**
 * Низ бесконечного списка: невидимый sentinel запускает `onLoadMore` при подходе к концу,
 * ниже — индикатор загрузки или кнопка («Показать ещё» после лимита, «Попробовать снова» при ошибке).
 */
export const InfiniteScrollFooter = ({
  loadedCount,
  hasNextPage,
  isFetchingNextPage,
  isError,
  onLoadMore
}: IInfiniteScrollFooterProps) => {
  const isAutoLoad = loadedCount < AUTO_LOAD_LIMIT

  const handleIntersect = useCallback(() => {
    if (isAutoLoad && hasNextPage && !isFetchingNextPage && !isError) onLoadMore()
  }, [isAutoLoad, hasNextPage, isFetchingNextPage, isError, onLoadMore])

  const sentinelRef = useInfiniteScroll(handleIntersect)

  return (
    <>
      {isFetchingNextPage && (
        <Box display="flex" justifyContent="center" mb={4}>
          <CircularProgress sx={{ color: 'primary.light' }} />
        </Box>
      )}

      {isError && !isFetchingNextPage && (
        <Box display="flex" justifyContent="center" mb={4}>
          <Button variant="outlined" onClick={() => onLoadMore()}>
            Не удалось загрузить ещё. Попробовать снова
          </Button>
        </Box>
      )}

      {!isAutoLoad && hasNextPage && !isFetchingNextPage && !isError && (
        <Box display="flex" justifyContent="center" mb={4}>
          <Button variant="outlined" onClick={() => onLoadMore()}>
            Показать ещё
          </Button>
        </Box>
      )}

      <div ref={sentinelRef} style={{ height: 1 }} />
    </>
  )
}
