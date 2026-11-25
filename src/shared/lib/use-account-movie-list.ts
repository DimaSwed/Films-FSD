import { QueryKey, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useDebounce } from 'use-debounce'

import { BACK_NAVIGATION_GC_TIME } from '../config'

import { getFullListKey, getPagedListKey, TAddedOrder } from './account-movie-list-cache'
import type { IMovie, IPaginatedResponse } from './common.types'
import { getNextTmdbPage, loadAllPages, selectUniqueMovies } from './infinite-movies'
import { applyMovieListView, isAddedOrder, TMovieSort } from './movie-list-view'
import { useHistoryState } from './use-history-state'

const STALE_TIME = 1000 * 60 * 5

interface IUseAccountMovieListOptions {
  /** Общая часть ключа: однозначно определяет список и его владельца. */
  baseKey: QueryKey
  /** Пользователь вошёл и его данные загружены — можно запрашивать список. */
  enabled: boolean
  fetchPage: (order: TAddedOrder, page: number) => Promise<IPaginatedResponse<IMovie>>
}

/**
 * Список фильмов из аккаунта TMDB («Избранное», «Просмотрено») с поиском и сортировкой.
 *
 * Обычно фильмы подгружаются постранично, а порядок «по дате добавления» делает сам TMDB.
 * Поиск по названию и остальные сортировки TMDB не умеет, поэтому тогда мы загружаем все страницы
 * сразу и обрабатываем список у себя — так же, как в «К просмотру».
 */
export const useAccountMovieList = ({
  baseKey,
  enabled,
  fetchPage
}: IUseAccountMovieListOptions) => {
  // Запоминаем поиск и сортировку, чтобы при возврате «назад» показать список таким же
  const [query, setQuery] = useHistoryState('list-query', '')
  const [sort, setSort] = useHistoryState<TMovieSort>('list-sort', 'added-desc')
  // Поиск запускает загрузку всех страниц, поэтому ждём, пока пользователь допечатает.
  // Когда поле очищено, список возвращаем сразу, без задержки.
  const [debouncedQuery] = useDebounce(query, 400)
  const activeQuery = query.trim() === '' ? '' : debouncedQuery

  // Для сортировок, которые мы делаем сами, порядок с сервера не важен — берём один и тот же,
  // чтобы не грузить список заново.
  const order: TAddedOrder = sort === 'added-asc' ? 'created_at.asc' : 'created_at.desc'
  const needsAllPages = activeQuery.trim() !== '' || !isAddedOrder(sort)

  const paged = useInfiniteQuery({
    queryKey: getPagedListKey(baseKey, order),
    queryFn: ({ pageParam }) => fetchPage(order, pageParam),
    initialPageParam: 1,
    getNextPageParam: getNextTmdbPage,
    select: selectUniqueMovies,
    enabled: enabled && !needsAllPages,
    staleTime: STALE_TIME,
    gcTime: BACK_NAVIGATION_GC_TIME,
    retry: 2
  })

  const all = useQuery({
    queryKey: getFullListKey(baseKey, order),
    queryFn: () => loadAllPages((page) => fetchPage(order, page)),
    enabled: enabled && needsAllPages,
    staleTime: STALE_TIME,
    gcTime: BACK_NAVIGATION_GC_TIME,
    retry: 2
  })

  // Пока весь список не загрузился, показываем то, что уже есть со страничной загрузки.
  const allMovies = needsAllPages ? (all.data ?? paged.data) : paged.data
  const active = needsAllPages ? all : paged

  const movies = useMemo(
    () => applyMovieListView(allMovies ?? [], { query: activeQuery, sort }),
    [allMovies, activeQuery, sort]
  )

  return {
    /** Фильмы с учётом поиска и сортировки. */
    movies,
    /** Значение поля поиска (без задержки). */
    query,
    sort,
    // Здесь при смене ничего больше делать не нужно, поэтому отдаём обычные сеттеры.
    handleQueryChange: setQuery,
    handleSortChange: setSort,
    /** Сколько фильмов загружено без учёта поиска: отличает «список пуст» от «ничего не найдено». */
    loadedCount: allMovies?.length ?? 0,
    isPending: allMovies === undefined && active.isPending,
    isError: active.isError,
    refetch: active.refetch,
    /** Загружаются все страницы для поиска или сортировки — результат пока неполный. */
    isLoadingAll: needsAllPages && all.isPending,
    /** Есть ли ещё страницы для подгрузки при прокрутке (только в обычном режиме). */
    hasNextPage: !needsAllPages && paged.hasNextPage,
    /** Идёт подгрузка: следующей страницы или повторная попытка после ошибки. */
    isFetchingMore: needsAllPages ? all.isFetching && all.isError : paged.isFetchingNextPage,
    /** Подгрузить следующую страницу или повторить загрузку после ошибки. */
    loadMore: needsAllPages ? all.refetch : paged.fetchNextPage
  }
}

export type TAccountMovieList = ReturnType<typeof useAccountMovieList>
