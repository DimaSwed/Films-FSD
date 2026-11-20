import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { SITE } from '../../config'
import { IHeadTag, upsertHeadTags } from '../../lib'

const DESCRIPTION_MAX_LENGTH = 200

interface IPageMetaProps {
  /** Название страницы; в `<title>` добавляется « | КиноТрекер». Без него — заголовок сайта по умолчанию. */
  title?: string
  description?: string
  /** Абсолютный URL или путь от корня сайта; по умолчанию — логотип. */
  image?: string
  /** Значение `og:type`, например `video.movie`. */
  type?: string
  /** Закрыть страницу от индексации (личные списки, профиль, 404). */
  noIndex?: boolean
}

const toAbsoluteUrl = (value: string) =>
  /^https?:\/\//.test(value) ? value : `${SITE.url}${value}`

const clip = (text: string, max: number) => {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : cut.length)}…`
}

const meta = (key: 'name' | 'property', id: string, value: string): IHeadTag => ({
  tag: 'meta',
  key,
  id,
  attr: 'content',
  value
})

/**
 * Метаданные страницы: `<title>`, description, canonical, Open Graph и Twitter. Ничего не рисует.
 * Правит теги, уже лежащие в `index.html`, и при уходе со страницы возвращает значения по умолчанию.
 * Нативные `<title>`/`<meta>` из React 19 не используем: они дублируют статические теги.
 */
export const PageMeta = ({
  title,
  description = SITE.defaultDescription,
  image = SITE.defaultImage,
  type = 'website',
  noIndex = false
}: IPageMetaProps) => {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE.name}` : SITE.defaultTitle
    const clippedDescription = clip(description, DESCRIPTION_MAX_LENGTH)
    const canonical = `${SITE.url}${pathname}`
    const imageUrl = toAbsoluteUrl(image)

    const tags: IHeadTag[] = [
      meta('name', 'description', clippedDescription),
      { tag: 'link', key: 'rel', id: 'canonical', attr: 'href', value: canonical },
      meta('property', 'og:title', fullTitle),
      meta('property', 'og:description', clippedDescription),
      meta('property', 'og:image', imageUrl),
      meta('property', 'og:url', canonical),
      meta('property', 'og:type', type),
      meta('name', 'twitter:title', fullTitle),
      meta('name', 'twitter:description', clippedDescription),
      meta('name', 'twitter:image', imageUrl),
      ...(noIndex ? [meta('name', 'robots', 'noindex, nofollow')] : [])
    ]

    const previousTitle = document.title
    document.title = fullTitle
    const rollback = upsertHeadTags(tags)

    return () => {
      document.title = previousTitle
      rollback()
    }
  }, [title, description, image, type, noIndex, pathname])

  return null
}
