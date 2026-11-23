import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'

import { useSessionId, useUserDetails } from '@/entities/user'
import {
  applyMovieListView,
  getNextTmdbPage,
  isAddedOrder,
  selectUniqueMovies,
  TMovieSort
} from '@/shared/lib'

import { favoritesApi } from '../api'

import { getFavoritesAllKey, getFavoritesListKey } from './favorites.keys'
import type { TFavoritesOrder } from './favorites.types'

const STALE_TIME = 1000 * 60 * 5

/**
 * Список избранного с поиском и сортировкой.
 *
 * Обычно фильмы подгружаются постранично, а порядок «по дате добавления» делает сам TMDB.
 * Поиск по названию и сортировку по рейтингу, релизу или названию TMDB не умеет, поэтому
 * тогда мы загружаем все страницы сразу и обрабатываем список у себя — так же, как в «К просмотру».
 */
export const useFavoritesList = () => {
  const sessionId = useSessionId()
  const { data: userDetails } = useUserDetails()
  const userId = userDetails?.id
  const isAuthorized = !!sessionId && !!userId

  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<TMovieSort>('added-desc')
  // Поиск запускает загрузку всех страниц, поэтому ждём, пока пользователь допечатает.
  // Когда поле очищено, список возвращаем сразу, без задержки.
  const [debouncedQuery] = useDebounce(query, 400)
  const activeQuery = query.trim() === '' ? '' : debouncedQuery

  // Для сортировок, которые мы делаем сами, порядок с сервера не важен — берём один и тот же,
  // чтобы не грузить список заново.
  const order: TFavoritesOrder = sort === 'added-asc' ? 'created_at.asc' : 'created_at.desc'
  const needsAllPages = activeQuery.trim() !== '' || !isAddedOrder(sort)

  const paged = useInfiniteQuery({
    queryKey: getFavoritesListKey(userId, order),
    queryFn: ({ pageParam }) => {
      if (!sessionId || !userId) {
        throw new Error('Требуется авторизация')
      }
      return favoritesApi.getFavorites(sessionId, userId, order, pageParam)
    },
    initialPageParam: 1,
    getNextPageParam: getNextTmdbPage,
    select: selectUniqueMovies,
    enabled: isAuthorized && !needsAllPages,
    staleTime: STALE_TIME,
    retry: 2
  })

  const all = useQuery({
    queryKey: getFavoritesAllKey(userId, order),
    queryFn: () => {
      if (!sessionId || !userId) {
        throw new Error('Требуется авторизация')
      }
      return favoritesApi.getAllFavorites(sessionId, userId, order)
    },
    enabled: isAuthorized && needsAllPages,
    staleTime: STALE_TIME,
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
