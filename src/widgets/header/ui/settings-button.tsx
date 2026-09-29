import SettingsIcon from '@mui/icons-material/Settings'
import { IconButton } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'

export const SettingsButton: FC = () => {
  return (
    <IconButton aria-label="open drawer" edge="start" component={Link} to="/settings">
      <SettingsIcon sx={{ color: 'white' }} />
    </IconButton>
  )
}
