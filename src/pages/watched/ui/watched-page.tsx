import { AccountMovieList } from '@/widgets/account-movie-list'
import { UserRatingButton, useRatedMovies } from '@/features/rate-movie'
import { IMovieSortOption } from '@/shared/lib'
import { PageMeta } from '@/shared/ui'

const SORT_OPTIONS: readonly IMovieSortOption[] = [
  { value: 'added-desc', label: 'Сначала недавно оценённые' },
  { value: 'added-asc', label: 'Сначала давно оценённые' },
  { value: 'user-rating-desc', label: 'По моей оценке' },
  { value: 'rating-desc', label: 'По рейтингу TMDB' },
  { value: 'release-desc', label: 'Новые релизы' },
  { value: 'title-asc', label: 'По названию (А–Я)' }
]

export const WatchedPage = () => {
  const list = useRatedMovies()

  return (
    <>
      <PageMeta title="Просмотрено" noIndex />
      <AccountMovieList
        title="Просмотрено"
        list={list}
        sortOptions={SORT_OPTIONS}
        renderActions={({ id, title, userRating }) =>
          userRating !== undefined && (
            <UserRatingButton movieId={id} title={title} userRating={userRating} />
          )
        }
        signedOutMessage={{
          title: 'Войдите, чтобы увидеть просмотренное',
          description: 'Список просмотренных фильмов доступен после авторизации через TMDB.'
        }}
        emptyMessage={{
          title: 'Здесь появятся просмотренные фильмы',
          description:
            'Поставьте фильму оценку на его странице или нажмите «Просмотрено» в списке «К просмотру».'
        }}
        notFoundText="В просмотренном нет фильмов с таким названием."
      />
    </>
  )
}
