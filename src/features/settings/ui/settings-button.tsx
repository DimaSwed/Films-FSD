import { FC } from 'react'
import { IconButton } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'

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
