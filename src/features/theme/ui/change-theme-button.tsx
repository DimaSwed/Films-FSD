import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { FC } from 'react'

import { useThemeContext } from '../model'

export const ChangeThemeButton: FC = () => {
  const { theme, toggleTheme } = useThemeContext()
  const isDark = theme === 'dark'

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={toggleTheme}
        sx={{
          minHeight: 48,
          px: 2,
          display: 'flex',
          gap: 2,
          borderRadius: '20px',
          border: '1px solid #f5f5f5',
          transition: 'background-color 0.3s ease',
          '@media (hover: hover)': { '&:hover': { backgroundColor: 'navigation.hover' } },
          '&.Mui-focusVisible': {
            outline: '2px solid',
            outlineColor: 'navigation.contrastText',
            outlineOffset: '2px'
          }
        }}
      >
        <ListItemIcon
          sx={{ minWidth: 0, justifyContent: 'center', color: 'navigation.contrastText' }}
        >
          {isDark ? <DarkModeIcon /> : <LightModeIcon />}
        </ListItemIcon>
        <ListItemText
          sx={{
            display: { xs: 'none', sm: 'none', md: 'block' },
            color: 'navigation.contrastText'
          }}
        >
          {isDark ? 'Темная тема' : 'Светлая тема'}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}
