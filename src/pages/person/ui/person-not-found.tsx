import { NotFoundState, PageMeta } from '@/shared/ui'

/** В адресе не номер или такого человека нет в TMDB. */
export const PersonNotFound = () => (
  <>
    <PageMeta title="Страница не найдена" noIndex />
    <NotFoundState
      caption="ПЕРСОНА"
      title="Человек"
      accent="не найден"
      description="Такого актёра или режиссёра в каталоге нет: возможно, в ссылке опечатка или его удалили из базы TMDB. Откройте фильм — актёры и режиссёры там кликабельны."
      actions={[
        { label: 'Найти фильм', to: '/search' },
        { label: 'На главную', to: '/' }
      ]}
    />
  </>
)
