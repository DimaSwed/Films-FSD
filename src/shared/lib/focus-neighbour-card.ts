const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Переводит фокус на соседнюю карточку в сетке — следующую, а если её нет, предыдущую.
 * Нужен, когда карточка с фокусом вот-вот исчезнет (её убрали из списка): иначе фокус
 * клавиатуры уходит на `body`, и следующий Tab начинается от шапки сайта.
 * Карточка — ближайший `<article>`, соседи — его братья в сетке. Если соседей нет, ничего не делает.
 */
export const focusNeighbourCard = (from: HTMLElement) => {
  const card = from.closest('article')
  const neighbour = card?.nextElementSibling ?? card?.previousElementSibling
  neighbour?.querySelector<HTMLElement>(FOCUSABLE)?.focus()
}
