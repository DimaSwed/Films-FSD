import { FC, ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryProvider } from '@/app/providers/QueryProvider'
import { ThemeSnackbarProvider } from '@/app//providers/ThemeSnackbarProvider'

interface IAppProvidersProps {
  children: ReactNode
}

export const AppProviders: FC<IAppProvidersProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <QueryProvider>
        <ThemeSnackbarProvider>{children}</ThemeSnackbarProvider>
      </QueryProvider>
    </BrowserRouter>
  )
}
