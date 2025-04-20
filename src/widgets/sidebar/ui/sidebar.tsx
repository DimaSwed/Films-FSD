import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
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
import {
  Movie,
  Search,
  NewReleases,
  PlaylistPlay,
  FeaturedVideo,
  List as ListIcon
} from '@mui/icons-material'
import { SidebarItem } from '@/widgets/sidebar'
import { UserSubscriptionInfo } from '@/entities/user'
import { useSessionId } from '@/features/auth'

export const Sidebar: FC = () => {
  const theme = useTheme()
  const sessionId = useSessionId()
  // console.log(sessionId)

  return (
    <Stack
      sx={{
        backgroundColor: 'primary.main',
        // position: 'sticky',
        position: 'relative',
        maxWidth: { xs: '50px', md: '280px' },
        width: '100%',
        color: 'text.primary',
        minHeight: '100%',
        padding: { xs: '5px', md: '10px' },
        boxShadow: theme.shadows[7]
      }}
    >
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        {sessionId && <UserSubscriptionInfo />}
      </Box>
      {sessionId && (
        <Divider sx={{ display: { xs: 'none', md: 'block' }, backgroundColor: 'text.primary' }} />
      )}

      <List component="nav">
        <SidebarItem primary="Ваши данные">
          <ListItemButton component={Link} to="/profile" sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon
              sx={{ minWidth: { xs: 'auto', md: '56px' }, color: 'primary.contrastText' }}
            >
              <Avatar sx={{ width: 24, height: 24 }} />
            </ListItemIcon>
            <ListItemText
              primary="Профиль"
              sx={{ display: { xs: 'none', md: 'block' }, color: 'primary.contrastText' }}
            />
          </ListItemButton>
        </SidebarItem>

        <SidebarItem primary="Просмотр">
          <ListItemButton component={Link} to="/movies" sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon
              sx={{ minWidth: { xs: 'auto', md: '56px' }, color: 'primary.contrastText' }}
            >
              <Movie />
            </ListItemIcon>
            <ListItemText
              primary="Фильмы"
              sx={{ display: { xs: 'none', md: 'block' }, color: 'primary.contrastText' }}
            />
          </ListItemButton>
          <ListItemButton component={Link} to="/search" sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon
              sx={{ minWidth: { xs: 'auto', md: '56px' }, color: 'primary.contrastText' }}
            >
              <Search />
            </ListItemIcon>
            <ListItemText
              primary="Поиск"
              sx={{ display: { xs: 'none', md: 'block' }, color: 'primary.contrastText' }}
            />
          </ListItemButton>
        </SidebarItem>

        <SidebarItem primary="Ознакомиться">
          <ListItemButton component={Link} to="/trailers" sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon
              sx={{ minWidth: { xs: 'auto', md: '56px' }, color: 'primary.contrastText' }}
            >
              <FeaturedVideo />
            </ListItemIcon>
            <ListItemText
              primary="Последние Трейлеры"
              sx={{ display: { xs: 'none', md: 'block' }, color: 'primary.contrastText' }}
            />
          </ListItemButton>
          <ListItemButton sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon
              sx={{ minWidth: { xs: 'auto', md: '56px' }, color: 'primary.contrastText' }}
            >
              <NewReleases />
            </ListItemIcon>
            <ListItemText
              primary="Новости"
              sx={{ display: { xs: 'none', md: 'block' }, color: 'primary.contrastText' }}
            />
          </ListItemButton>
        </SidebarItem>

        <SidebarItem primary="Списки">
          <ListItemButton component={Link} to="/watch-list" sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon
              sx={{ minWidth: { xs: 'auto', md: '56px' }, color: 'primary.contrastText' }}
            >
              <ListIcon />
            </ListItemIcon>
            <ListItemText
              primary="Список к просмотру"
              sx={{ display: { xs: 'none', md: 'block' }, color: 'primary.contrastText' }}
            />
          </ListItemButton>
          <ListItemButton sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon
              sx={{ minWidth: { xs: 'auto', md: '56px' }, color: 'primary.contrastText' }}
            >
              <PlaylistPlay />
            </ListItemIcon>
            <ListItemText
              primary="Список просмотренного"
              sx={{ display: { xs: 'none', md: 'block' }, color: 'primary.contrastText' }}
            />
          </ListItemButton>
        </SidebarItem>
      </List>
    </Stack>
  )
}
