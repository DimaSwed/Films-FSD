import { useEffect, useState } from 'react'

/** Доля видимой ширины, на которую прокручивает стрелка: крайняя карточка остаётся на экране. */
const SCROLL_STEP = 0.8

/** Есть ли что прокручивать влево и вправо в горизонтальном контейнере. `ref` вешается на контейнер. */
export const useScrollEdges = () => {
  const [node, setNode] = useState<HTMLElement | null>(null)
  const [edges, setEdges] = useState({ canScrollLeft: false, canScrollRight: false })

  useEffect(() => {
    if (!node) return

    const update = () => {
      const canScrollLeft = node.scrollLeft > 1
      // 1 px запаса: при дробном масштабе scrollLeft не доходит до края
      const canScrollRight = node.scrollLeft + node.clientWidth < node.scrollWidth - 1

      // Тот же объект, если ничего не изменилось: событие scroll приходит десятки раз в секунду
      setEdges((prev) =>
        prev.canScrollLeft === canScrollLeft && prev.canScrollRight === canScrollRight
          ? prev
          : { canScrollLeft, canScrollRight }
      )
    }

    const observer = new ResizeObserver(update)
    // И содержимое: если карточек стало больше, размер самого контейнера не меняется
    for (const element of [node, ...node.children]) observer.observe(element)
    node.addEventListener('scroll', update, { passive: true })

    return () => {
      observer.disconnect()
      node.removeEventListener('scroll', update)
    }
  }, [node])

  const scroll = (direction: -1 | 1) =>
    node?.scrollBy({ left: direction * node.clientWidth * SCROLL_STEP, behavior: 'smooth' })

  return { ref: setNode, scroll, ...edges }
}
