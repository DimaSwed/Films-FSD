import type { InfiniteData, QueryClient, QueryKey } from '@tanstack/react-query'

import type { IMovie, IPaginatedResponse } from './common.types'

/** Порядок списка аккаунта у TMDB — по дате добавления. */
export type TAddedOrder = 'created_at.asc' | 'created_at.desc'

/** Ключ постраничного списка. Общая часть (`baseKey`) — своя у каждого списка. */
export const getPagedListKey = (baseKey: QueryKey, order: TAddedOrder) =>
  [...baseKey, 'paged', order] as const

/** Ключ того же списка, загруженного целиком (для поиска и сортировки на клиенте). */
export const getFullListKey = (baseKey: QueryKey, order: TAddedOrder) =>
  [...baseKey, 'all', order] as const

type TListData = IMovie[] | InfiniteData<IPaginatedResponse<IMovie>>

interface IUpdateAccountMovieListOptions {
  /** Правка, которую можно показать сразу, не дожидаясь сервера. */
  update?: (movies: IMovie[]) => IMovie[]
  /** Нужно ли перезапросить уже загруженный список, если он сейчас на экране. По умолчанию — да. */
  shouldRefetch?: (movies: IMovie[]) => boolean
}

const getMovies = (data: TListData): IMovie[] =>
  Array.isArray(data) ? data : data.pages.flatMap((page) => page.results)

/**
 * Обновляет все кэшированные виды списка аккаунта — и постраничный, и загруженный целиком (массив) —
 * после того, как фильм добавили, убрали или оценили.
 *
 * Начатые загрузки отменяем: их ответ мог быть собран до изменения и перекрыл бы его. Все виды списка
 * помечаем устаревшими, а тот, что на экране, загружаем заново, если он ещё не загружен или этого
 * требует `shouldRefetch`.
 */
export const updateAccountMovieList = async (
  queryClient: QueryClient,
  baseKey: QueryKey,
  { update, shouldRefetch = () => true }: IUpdateAccountMovieListOptions = {}
) => {
  await queryClient.cancelQueries({ queryKey: baseKey })

  if (update) {
    queryClient.setQueriesData<TListData>({ queryKey: baseKey }, (old) => {
      if (!old || Array.isArray(old)) return old && update(old)

      return {
        ...old,
        pages: old.pages.map((page) => ({ ...page, results: update(page.results) }))
      }
    })
  }

  void queryClient.invalidateQueries({ queryKey: baseKey, refetchType: 'none' })

  // Загрузку не ждём: иначе кнопка и уведомление зависели бы от неё
  void queryClient.refetchQueries({
    queryKey: baseKey,
    type: 'active',
    predicate: ({ state }) => {
      const data = state.data as TListData | undefined
      return !data || shouldRefetch(getMovies(data))
    }
  })
}
