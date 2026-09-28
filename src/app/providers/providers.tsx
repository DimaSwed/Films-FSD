import { FC, ReactNode } from 'react'

import { QueryProvider } from './query-provider'
import { ThemeSnackbarProvider } from './theme-provider'

interface IAppProvidersProps {
  children: ReactNode
}

export const AppProviders: FC<IAppProvidersProps> = ({ children }) => {
  return (
    <QueryProvider>
      <ThemeSnackbarProvider>{children}</ThemeSnackbarProvider>
    </QueryProvider>
  )
}
