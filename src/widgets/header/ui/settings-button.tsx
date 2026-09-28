import SettingsIcon from '@mui/icons-material/Settings'
import { IconButton } from '@mui/material'
import { FC } from 'react'

export const SettingsButton: FC = () => {
  return (
    <>
      <IconButton
        aria-label="open drawer"
        edge="start"
        // sx={{ display: { sm: 'none' } }}
      >
        <SettingsIcon sx={{ color: 'white' }} />
      </IconButton>
    </>
  )
}
