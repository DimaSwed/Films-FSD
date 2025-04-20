import { FC } from 'react'
import { Button } from '@mui/material'

interface RemoveButtonProps {
  onClick: () => void
  text?: string
}

export const RemoveButton: FC<RemoveButtonProps> = ({ onClick, text }) => {
  return (
    <Button
      variant="contained"
      color="error"
      onClick={onClick}
      sx={{
        minWidth: '140px',
        lineHeight: '130%',
        '&:hover': {
          backgroundColor: 'error.dark'
        }
      }}
    >
      {text}
    </Button>
  )
}
