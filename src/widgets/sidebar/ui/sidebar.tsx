import {
  Movie,
  Visibility,
  Search,
  PlaylistPlay,
  FeaturedVideo,
  List as ListIcon
} from '@mui/icons-material'
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Box,
  Stack
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { UserSubscriptionInfo } from '@/features/auth'
import { useSessionId } from '@/entities/user'

import { SidebarItem } from './sidebar-item'

export const Sidebar: FC = () => {
  const theme = useTheme()
  const sessionId = useSessionId()

  return (
    <Stack
      sx={{
        backgroundColor: 'navigation.main',
        // position: 'sticky',
        position: 'relative',
        maxWidth: { xs: '50px', md: '280px' },
        width: '100%',
        color: 'navigation.contrastText',
        minHeight: '100%',
        padding: { xs: '5px', md: '10px' },
        boxShadow: theme.shadows[7],
        // Фон тёмный и в светлой теме: обычная подсветка MUI (чёрная, полупрозрачная) на нём не видна
        '& .MuiListItemButton-root': {
          '@media (hover: hover)': { '&:hover': { bgcolor: 'navigation.hover' } },
          '&.Mui-focusVisible': {
            outline: '2px solid',
            outlineColor: 'navigation.contrastText',
            outlineOffset: '-2px'
          }
        }
      }}
    >
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        {sessionId && <UserSubscriptionInfo />}
      </Box>
      {sessionId && (
        <Divider
          sx={{ display: { xs: 'none', md: 'block' }, backgroundColor: 'rgba(255,255,255,0.25)' }}
        />
      )}

      <List component="nav">
        <SidebarItem primary="Ваши данные">
          <ListItemButton component={Link} to="/profile" sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon
              sx={{ minWidth: { xs: 'auto', md: '56px' }, color: 'navigation.contrastText' }}
            >
              <Avatar sx={{ width: 24, height: 24 }} />
            </ListItemIcon>
            <ListItemText
              primary="Профиль"
              sx={{ display: { xs: 'none', md: 'block' }, color: 'navigation.contrastText' }}
            />
          </ListItemButton>
        </SidebarItem>

        <SidebarItem primary="Просмотр">
          <ListItemButton component={Link} to="/movies" sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon
              sx={{ minWidth: { xs: 'auto', md: '56px' }, color: 'navigation.contrastText' }}
            >
              <Movie />
            </ListItemIcon>
            <ListItemText
              primary="Фильмы"
              sx={{ display: { xs: 'none', md: 'block' }, color: 'navigation.contrastText' }}
            />
          </ListItemButton>
          <ListItemButton component={Link} to="/search" sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon
              sx={{ minWidth: { xs: 'auto', md: '56px' }, color: 'navigation.contrastText' }}
            >
              <Search />
            </ListItemIcon>
            <ListItemText
              primary="Поиск"
              sx={{ display: { xs: 'none', md: 'block' }, color: 'navigation.contrastText' }}
            />
          </ListItemButton>
        </SidebarItem>

        <SidebarItem primary="Ознакомиться">
          <ListItemButton component={Link} to="/trailers" sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon
              sx={{ minWidth: { xs: 'auto', md: '56px' }, color: 'navigation.contrastText' }}
            >
              <FeaturedVideo />
            </ListItemIcon>
            <ListItemText
              primary="Последние Трейлеры"
              sx={{ display: { xs: 'none', md: 'block' }, color: 'navigation.contrastText' }}
            />
          </ListItemButton>
        </SidebarItem>

        <SidebarItem primary="Списки">
          <ListItemButton component={Link} to="/watch-list" sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon
              sx={{ minWidth: { xs: 'auto', md: '56px' }, color: 'navigation.contrastText' }}
            >
              <ListIcon />
            </ListItemIcon>
            <ListItemText
              primary="Список к просмотру"
              sx={{ display: { xs: 'none', md: 'block' }, color: 'navigation.contrastText' }}
            />
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/watched"
            aria-label="Просмотрено"
            sx={{ pl: { xs: 1, md: 4 } }}
          >
            <ListItemIcon
              sx={{ minWidth: { xs: 'auto', md: '56px' }, color: 'navigation.contrastText' }}
            >
              <Visibility />
            </ListItemIcon>
            <ListItemText
              primary="Просмотрено"
              sx={{ display: { xs: 'none', md: 'block' }, color: 'navigation.contrastText' }}
            />
          </ListItemButton>

          <ListItemButton component={Link} to="/favorites-list" sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon
              sx={{ minWidth: { xs: 'auto', md: '56px' }, color: 'navigation.contrastText' }}
            >
              <PlaylistPlay />
            </ListItemIcon>
            <ListItemText
              primary="Список избранного"
              sx={{ display: { xs: 'none', md: 'block' }, color: 'navigation.contrastText' }}
            />
          </ListItemButton>
        </SidebarItem>
      </List>
    </Stack>
  )
}
