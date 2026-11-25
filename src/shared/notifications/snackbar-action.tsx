import { Button } from '@mui/material'
import { FC } from 'react'

import { SnackbarCloseButton } from './snackbar-close-button'

interface ISnackbarActionProps {
  label: string
  onAction: () => void
  onClose: () => void
}

/** Кнопки в уведомлении: действие (например, «Отменить») и крестик. */
export const SnackbarAction: FC<ISnackbarActionProps> = ({ label, onAction, onClose }) => {
  const handleAction = () => {
    // Сразу закрываем уведомление, чтобы действие нельзя было нажать дважды
    onClose()
    onAction()
  }

  return (
    <>
      <Button color="inherit" onClick={handleAction} sx={{ minHeight: 40, fontWeight: 700 }}>
        {label}
      </Button>
      <SnackbarCloseButton onClose={onClose} />
    </>
  )
}
