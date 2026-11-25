import SettingsIcon from '@mui/icons-material/Settings'
import { IconButton } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'

export const SettingsButton: FC = () => {
  return (
    <IconButton
      aria-label="Настройки"
      edge="start"
      component={Link}
      to="/settings"
      sx={{
        color: 'navigation.contrastText',
        '@media (hover: hover)': { '&:hover': { bgcolor: 'navigation.hover' } }
      }}
    >
      <SettingsIcon />
    </IconButton>
  )
}
