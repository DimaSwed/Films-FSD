import { FC, ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryProvider } from '@/app/providers/query-provider'
import { ThemeSnackbarProvider } from '@/app/providers/theme-provider'

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
