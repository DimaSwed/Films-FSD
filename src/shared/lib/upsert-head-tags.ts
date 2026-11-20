export interface IHeadTag {
  tag: 'meta' | 'link'
  /** Атрибут-идентификатор: `name` / `property` у `meta`, `rel` у `link`. */
  key: 'name' | 'property' | 'rel'
  id: string
  /** Атрибут со значением: `content` у `meta`, `href` у `link`. */
  attr: 'content' | 'href'
  value: string
}

/**
 * Обновляет теги в `<head>`: существующий (например, статический из `index.html`) правит на месте,
 * отсутствующий создаёт — дублей не появляется. Возвращает функцию, которая откатывает всё как было.
 */
export const upsertHeadTags = (tags: IHeadTag[]): (() => void) => {
  const rollbacks: (() => void)[] = []

  for (const { tag, key, id, attr, value } of tags) {
    const existing = document.head.querySelector(`${tag}[${key}="${id}"]`)

    if (existing) {
      const previous = existing.getAttribute(attr)
      existing.setAttribute(attr, value)
      rollbacks.push(() =>
        previous === null ? existing.removeAttribute(attr) : existing.setAttribute(attr, previous)
      )
      continue
    }

    const created = document.createElement(tag)
    created.setAttribute(key, id)
    created.setAttribute(attr, value)
    document.head.append(created)
    rollbacks.push(() => created.remove())
  }

  return () => rollbacks.reverse().forEach((rollback) => rollback())
}
