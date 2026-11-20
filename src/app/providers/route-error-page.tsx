import { useEffect, useRef } from 'react'
import { useRouteError } from 'react-router-dom'

import { ErrorPage } from '@/widgets/error-page'
import { useNotification } from '@/shared/notifications'

import { reportError } from './report-error'

const DEFAULT_MESSAGE = 'Произошла непредвиденная ошибка'

/** В dev показываем текст ошибки; в production — только понятную пользователю фразу. */
const getToastMessage = (error: unknown) =>
  import.meta.env.DEV && error instanceof Error && error.message
    ? `${DEFAULT_MESSAGE}: ${error.message}`
    : DEFAULT_MESSAGE

/** `errorElement` корневого маршрута: ошибка рендера внутри роутера → лог, тост и ErrorPage. */
export const RouteErrorPage = () => {
  const error = useRouteError()
  const notify = useNotification()
  // StrictMode в dev вызывает эффект дважды — не логируем одну и ту же ошибку повторно
  const reportedError = useRef<unknown>(null)

  useEffect(() => {
    if (reportedError.current === error) return
    reportedError.current = error

    reportError(error)
    notify.errors(getToastMessage(error))
  }, [error, notify])

  return <ErrorPage />
}
