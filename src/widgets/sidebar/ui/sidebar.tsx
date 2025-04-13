import { FC } from 'react'
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
import { useNavigate } from 'react-router-dom'
import { SidebarItem } from '@/widgets/sidebar/components/sidebar-item'
import { UserSubscriptionInfo } from '@/entities/user'
import { useSessionId } from '@/features/auth/hooks/use-session-id'

export const Sidebar: FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const sessionId = useSessionId()

  return (
    <Stack
      sx={{
        backgroundColor: 'primary.main',
        position: 'sticky',
        maxWidth: { xs: '50px', md: '280px' },
        width: '100%',
        color: 'text.primary',
        minHeight: '100vh',
        padding: { xs: '5px', md: '10px' },
        boxShadow: theme.shadows[7]
      }}
    >
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        {sessionId && <UserSubscriptionInfo />}
      </Box>

      <Divider sx={{ display: { xs: 'none', md: 'block' }, backgroundColor: '#444' }} />

      <List component="nav">
        <SidebarItem primary="Ваши данные">
          <ListItemButton onClick={() => navigate('/profile')} sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon sx={{ minWidth: { xs: 'auto', md: '56px' } }}>
              <Avatar sx={{ width: 24, height: 24 }} />
            </ListItemIcon>
            <ListItemText primary="Профиль" sx={{ display: { xs: 'none', md: 'block' } }} />
          </ListItemButton>
        </SidebarItem>

        <SidebarItem primary="Просмотр">
          <ListItemButton onClick={() => navigate('/movies')} sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon sx={{ minWidth: { xs: 'auto', md: '56px' } }}>
              <Movie />
            </ListItemIcon>
            <ListItemText primary="Фильмы" sx={{ display: { xs: 'none', md: 'block' } }} />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/search')} sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon sx={{ minWidth: { xs: 'auto', md: '56px' } }}>
              <Search />
            </ListItemIcon>
            <ListItemText primary="Поиск" sx={{ display: { xs: 'none', md: 'block' } }} />
          </ListItemButton>
        </SidebarItem>

        <SidebarItem primary="Ознакомиться">
          <ListItemButton onClick={() => navigate('/trailers')} sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon sx={{ minWidth: { xs: 'auto', md: '56px' } }}>
              <FeaturedVideo />
            </ListItemIcon>
            <ListItemText
              primary="Последние Трейлеры"
              sx={{ display: { xs: 'none', md: 'block' } }}
            />
          </ListItemButton>
          <ListItemButton sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon sx={{ minWidth: { xs: 'auto', md: '56px' } }}>
              <NewReleases />
            </ListItemIcon>
            <ListItemText primary="Новости" sx={{ display: { xs: 'none', md: 'block' } }} />
          </ListItemButton>
        </SidebarItem>

        <SidebarItem primary="Списки">
          <ListItemButton
            onClick={() => navigate('/add-to-watch-list')}
            sx={{ pl: { xs: 1, md: 4 } }}
          >
            <ListItemIcon sx={{ minWidth: { xs: 'auto', md: '56px' } }}>
              <ListIcon />
            </ListItemIcon>
            <ListItemText
              primary="Список к просмотру"
              sx={{ display: { xs: 'none', md: 'block' } }}
            />
          </ListItemButton>
          <ListItemButton sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon sx={{ minWidth: { xs: 'auto', md: '56px' } }}>
              <PlaylistPlay />
            </ListItemIcon>
            <ListItemText
              primary="Список просмотренного"
              sx={{ display: { xs: 'none', md: 'block' } }}
            />
          </ListItemButton>
        </SidebarItem>
      </List>
    </Stack>
  )
}
