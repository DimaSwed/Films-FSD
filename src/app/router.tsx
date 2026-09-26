import { createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { NotFoundPage } from '@/pages/not-found'
import { HomePage } from '@/pages/home'
import { ProfilePage } from '@/pages/profile'
import { SettingsPage } from '@/pages/settings'
import { LegalInfoPage } from '@/pages/legal-info'
import { TrailersPage } from '@/pages/trailers'
import { MoviePage } from '@/pages/movie'
import { MoviesPage } from '@/pages/movies'
import { SearchPage } from '@/pages/search'
import { WatchListPage } from '@/pages/watch-list'
import { CategoryMoviesPage } from '@/pages/category'
import { GenreMoviesPage } from '@/pages/genre'
import { FavoritesListPage } from '@/pages/favorites-list'

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
