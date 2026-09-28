import { ComponentType, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { NotFoundPage } from '@/pages/not-found'

import { App } from './App'
// Страница 404 остаётся в основном бандле: она же errorElement и должна открываться без загрузки

/** Страница подгружается отдельным чанком при первом заходе на маршрут. */
const lazyPage = <K extends string>(load: () => Promise<Record<K, ComponentType>>, name: K) =>
  lazy(() => load().then((module) => ({ default: module[name] })))

const HomePage = lazyPage(() => import('@/pages/home'), 'HomePage')
const ProfilePage = lazyPage(() => import('@/pages/profile'), 'ProfilePage')
const SettingsPage = lazyPage(() => import('@/pages/settings'), 'SettingsPage')
const LegalInfoPage = lazyPage(() => import('@/pages/legal-info'), 'LegalInfoPage')
const TrailersPage = lazyPage(() => import('@/pages/trailers'), 'TrailersPage')
const MoviePage = lazyPage(() => import('@/pages/movie'), 'MoviePage')
const MoviesPage = lazyPage(() => import('@/pages/movies'), 'MoviesPage')
const SearchPage = lazyPage(() => import('@/pages/search'), 'SearchPage')
const WatchListPage = lazyPage(() => import('@/pages/watch-list'), 'WatchListPage')
const CategoryMoviesPage = lazyPage(() => import('@/pages/category'), 'CategoryMoviesPage')
const GenreMoviesPage = lazyPage(() => import('@/pages/genre'), 'GenreMoviesPage')
const FavoritesListPage = lazyPage(() => import('@/pages/favorites-list'), 'FavoritesListPage')

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
