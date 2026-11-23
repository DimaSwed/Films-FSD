import { useState } from 'react'

const NO_ACTIVE_ITEM = -1

/**
 * Активный элемент списка при навигации стрелками (фокус остаётся в поле ввода).
 * `items` должен быть стабильной ссылкой: новая ссылка — другой список, выбор сбрасывается.
 */
export const useListNavigation = (items: readonly unknown[]) => {
  const [state, setState] = useState({ items, index: NO_ACTIVE_ITEM })

  // Сброс при рендере, а не сравнением при чтении: иначе возврат к прежнему списку (история,
  // кэш React Query отдают ту же ссылку) восстановил бы старый выбор.
  if (state.items !== items) setState({ items, index: NO_ACTIVE_ITEM })

  const moveDown = () =>
    setState((prev) => ({ ...prev, index: Math.min(prev.index + 1, prev.items.length - 1) }))

  const moveUp = () =>
    setState((prev) => ({ ...prev, index: Math.max(prev.index - 1, NO_ACTIVE_ITEM) }))

  return { activeIndex: state.index, moveDown, moveUp }
}
