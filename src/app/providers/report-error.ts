/**
 * Сообщает о необработанной ошибке рендера. В production `console` вырезается сборкой,
 * поэтому там ошибка уходит через `window.reportError` — его видят window.onerror
 * и любой мониторинг (Sentry и т. п.).
 */
export const reportError = (error: unknown, componentStack?: string | null) => {
  if (import.meta.env.DEV) {
    console.error(error, componentStack ?? '')
    return
  }

  window.reportError?.(error)
}
