import { useSnackbar } from 'notistack'
import { createElement } from 'react'

import { SnackbarAction } from './snackbar-action'

// Дольше, чем у обычного уведомления: нужно успеть прочитать текст и нажать кнопку
const ACTION_DURATION_MS = 6000

interface INotificationAction {
  /** Уникальное имя уведомления. Пока оно на экране, второе с тем же именем не появится. */
  key: string
  label: string
  onAction: () => void
}

export const useNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  return {
    success: (msg: string) => enqueueSnackbar(msg, { variant: 'success' }),
    errors: (msg: string) => enqueueSnackbar(msg, { variant: 'error' }),
    info: (msg: string) => enqueueSnackbar(msg, { variant: 'info' }),
    warning: (msg: string) => enqueueSnackbar(msg, { variant: 'warning' }),
    successWithAction: (msg: string, { key, label, onAction }: INotificationAction) =>
      enqueueSnackbar(msg, {
        key,
        variant: 'success',
        autoHideDuration: ACTION_DURATION_MS,
        action: (id) =>
          createElement(SnackbarAction, { label, onAction, onClose: () => closeSnackbar(id) })
      })
  }
}
