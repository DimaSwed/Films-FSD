import { FC } from 'react'
import { Button } from '@mui/material'

interface IToggleDescriptionButtonProps {
  isOpen: boolean
  onClick: () => void
}

export const ToggleDescriptionButton: FC<IToggleDescriptionButtonProps> = ({ isOpen, onClick }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        minWidth: '140px',
        lineHeight: '130%',
        color: 'secondary.contrastText',
        borderColor: 'secondary.contrastText',
        '&:hover': {
          backgroundColor: 'primary.light',
          color: 'primary.contrastText',
          borderColor: 'primary.light'
        }
      }}
    >
      {isOpen ? 'Скрыть описание' : 'Показать описание'}
    </Button>
  )
}
