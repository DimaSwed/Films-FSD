import { Button } from '@mui/material'
import { FC } from 'react'

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
