import { useEffect, useState } from 'react'

export interface IUseInfiniteScrollOptions {
  /** Скролл-контейнер. По умолчанию — viewport. */
  root?: Element | null
  /** Запас до sentinel: подгрузка стартует заранее, без пауз на скролле. */
  rootMargin?: string
}

/**
 * Вызывает `callback`, когда sentinel-элемент входит в зону видимости.
 * Возвращает callback ref, который вешается на sentinel (`<div ref={sentinelRef} />`).
 *
 * Observer пересоздаётся при смене `callback` — новый observer сразу получает начальный
 * вызов, поэтому подгрузка продолжается, если sentinel всё ещё виден после добавления
 * элементов. Условия «можно ли грузить дальше» проверяются внутри `callback`,
 * который нужно передавать через `useCallback`.
 */
export const useInfiniteScroll = (
  callback: () => void,
  { root = null, rootMargin = '0px 0px 400px 0px' }: IUseInfiniteScrollOptions = {}
) => {
  const [sentinel, setSentinel] = useState<Element | null>(null)

  useEffect(() => {
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) callback()
      },
      { root, rootMargin, threshold: 0 }
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [sentinel, callback, root, rootMargin])

  return setSentinel
}
