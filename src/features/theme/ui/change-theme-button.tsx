import { FC } from 'react'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useThemeContext } from '@/features/theme/model/theme-context'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

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
          '&:hover': {
            backgroundColor: 'primary.light'
          }
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', color: 'primary.contrastText' }}>
          {isDark ? <DarkModeIcon /> : <LightModeIcon />}
        </ListItemIcon>
        <ListItemText
          sx={{
            display: { xs: 'none', sm: 'none', md: 'block' },
            color: 'primary.contrastText'
          }}
        >
          {isDark ? 'Темная тема' : 'Светлая тема'}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}
