import { createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { HomePage } from '@/pages/home/HomePage'
import { ProfilePage } from '@/pages/profile/ProfilePage'
import { SettingsPage } from '@/pages/settings/SettingsPage'
import { LegalInfoPage } from '@/pages/legal-info/LegalInfoPage'
import { TrailersPage } from '@/pages/trailers/TrailersPage'
import { MoviePage } from '@/pages/movie/[id]/MoviePage'
import { MoviesPage } from '@/pages/movies/MoviesPage'
import { SearchPage } from '@/pages/search/SearchPage'
import { WatchListPage } from '@/pages/watch-list/WatchListPage'
import { CategoryMoviesPage } from '@/pages/category/CategoryMoviesPage'
import { GenreMoviesPage } from '@/pages/genre/GenreMoviesPage'
import { FavoritesListPage } from '@/pages/favorites-list/FavoritesListPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'profile',
        element: <ProfilePage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      },
      {
        path: 'legal-info',
        element: <LegalInfoPage />
      },
      {
        path: 'trailers',
        element: <TrailersPage />
      },
      {
        path: 'movie/:id',
        element: <MoviePage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      },
      {
        path: 'movies',
        element: <MoviesPage />
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'watch-list',
        element: <WatchListPage />
      },
      {
        path: 'favorites-list',
        element: <FavoritesListPage />
      },
      { path: 'category/:categorySlug', element: <CategoryMoviesPage /> },
      {
        path: 'genre/:genreId',
        element: <GenreMoviesPage />
      }
    ]
  }
])
