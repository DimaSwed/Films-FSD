import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import { FC } from 'react'

interface ISnackbarCloseButtonProps {
  onClose: () => void
}

export const SnackbarCloseButton: FC<ISnackbarCloseButtonProps> = ({ onClose }) => (
  <IconButton size="small" color="inherit" aria-label="Закрыть уведомление" onClick={onClose}>
    <CloseIcon fontSize="small" />
  </IconButton>
)
