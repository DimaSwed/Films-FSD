import VisibilityIcon from '@mui/icons-material/Visibility'
import { Button } from '@mui/material'
import { FC } from 'react'

interface IMarkWatchedButtonProps {
  /** Открывает окно оценки. Само окно рисует страница: оно одно на весь список. */
  onClick: () => void
}

/** Кнопка «Просмотрено» для «К просмотру»: оценка переносит фильм в список просмотренных. */
export const MarkWatchedButton: FC<IMarkWatchedButtonProps> = ({ onClick }) => (
  <Button
    variant="contained"
    color="success"
    startIcon={<VisibilityIcon />}
    aria-haspopup="dialog"
    onClick={onClick}
    sx={{ minWidth: '140px', lineHeight: '130%' }}
  >
    Просмотрено
  </Button>
)
