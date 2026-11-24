import { NotFoundState, PageMeta } from '@/shared/ui'

/** В адресе не номер фильма или такого фильма нет в TMDB. */
export const MovieNotFound = () => (
  <>
    <PageMeta title="Фильм не найден" noIndex />
    <NotFoundState
      caption="ФИЛЬМ"
      title="Фильм"
      accent="не найден"
      description="Такого фильма в каталоге нет: возможно, в ссылке опечатка или его удалили из базы TMDB. Попробуйте найти его по названию."
      actions={[
        { label: 'Найти фильм', to: '/search' },
        { label: 'На главную', to: '/' }
      ]}
    />
  </>
)
