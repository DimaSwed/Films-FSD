import { AccountMovieList } from '@/widgets/account-movie-list'
import { MovieCardActions } from '@/widgets/movie-card-actions'
import {
  RemoveFavoriteButton,
  useFavoritesList,
  useRemoveFromFavoritesWithUndo
} from '@/features/favorites'
import { PageMeta } from '@/shared/ui'

export const FavoritesListPage = () => {
  const list = useFavoritesList()
  const removeFromFavorites = useRemoveFromFavoritesWithUndo()

  return (
    <>
      <PageMeta title="Избранное" noIndex />
      <AccountMovieList
        title="Список избранного"
        list={list}
        renderActions={(movie) => <MovieCardActions movie={movie} showFavorite={false} />}
        renderPosterAction={(movie) => (
          <RemoveFavoriteButton movie={movie} onRemove={removeFromFavorites} />
        )}
        signedOutMessage={{
          title: 'Войдите, чтобы увидеть избранное',
          description: 'Список избранных фильмов доступен после авторизации через TMDB.'
        }}
        emptyMessage={{
          title: 'Нет фильмов в избранном',
          description:
            'Найдите фильмы и добавьте их в список избранных, чтобы пересмотреть их позже.'
        }}
        notFoundText="В избранном нет фильмов с таким названием."
      />
    </>
  )
}
