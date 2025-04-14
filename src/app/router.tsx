// src/app/router.tsx
import { createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { NotFoundPage } from '@/pages/not-found/ui/NotFoundPage'
import { HomePage } from '@/pages/home/HomePage'
import { ProfilePage } from '@/pages/profile/ProfilePage'
// import { MoviesPage } from '@/pages/movies'
// import { NotFoundPage } from '@/pages/not-found'

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
      }
      // {
      //   path: 'movies',
      //   element: <MoviesPage />
      // }
      // другие маршруты...
    ]
  }
])
