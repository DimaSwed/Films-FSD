import { ThemeProvider } from '@mui/material'
import { FC, ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { ErrorPage } from '@/widgets/error-page'

import { darkTheme } from '../styles/theme'

import { reportError } from './report-error'

interface IAppErrorBoundaryProps {
  children: ReactNode
}

/**
 * Последняя страховка от белого экрана. Стоит снаружи всех провайдеров, поэтому ловит и их
 * ошибки; из-за этого сохранённая тема (cookie) здесь недоступна — ErrorPage рисуется
 * в тёмной теме по умолчанию и без тостов. Ошибки внутри роутера обрабатывает `RouteErrorPage`.
 */
export const AppErrorBoundary: FC<IAppErrorBoundaryProps> = ({ children }) => (
  <ErrorBoundary
    fallbackRender={() => (
      <ThemeProvider theme={darkTheme}>
        <ErrorPage />
      </ThemeProvider>
    )}
    onError={(error, info) => reportError(error, info.componentStack)}
  >
    {children}
  </ErrorBoundary>
)
