import { FC } from 'react'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  Link as MuiLink
} from '@mui/material'
import { Settings, Support, Email, PrivacyTip } from '@mui/icons-material'
import { UserSubscriptionInfo } from '@/entities/user'
import { Link } from 'react-router-dom'

export const SettingsPage: FC = () => {
  return (
    <Stack
      sx={{
        padding: { xs: '10px 0px', sm: '15px', md: '30px' },
        color: 'secondary.contrastText',
        bgcolor: 'background.paper',
        width: '100%'
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Дополнительно
      </Typography>

      <UserSubscriptionInfo />

      <Divider sx={{ backgroundColor: '#444' }} />

      {/* <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Настройки приложения
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Общие" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Отображение" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Уведомления" />
              <Typography variant="body2" color="psecondary.contrastText" sx={{ ml: 'auto' }}>
                Плюс+
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Где посмотреть" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Расширенные" />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ backgroundColor: '#444', my: 4 }} /> */}

      <Box sx={{ mt: 4, padding: { xs: '0px 10px' } }}>
        <Typography variant="h5" gutterBottom>
          О нас
        </Typography>
        <Typography variant="body2">
          КиноТрекер - новая платформа для поиска онлайн-трансляций, которая поможет вам узнать, где
          вы можете смотреть фильмы легально. Что нового в кинематографе? Где можно посмотреть
          фильм, о котором вы говорили? Как не упустить премьеры и составить собственные списки? В
          нашем приложении вы найдете все это. Чтобы сделать это взаимодействие более удобным, вы
          можете настроить свои параметры и использовать простые фильтры для разных поставщиков,
          таких как Кинопоиск, и различных жанров или годов выпуска фильмов.
          <br />
          <br />
          Наша цель - обеспечить любителям кино доступ к их любимым фильмам по всему миру.
          <br />
          <br />
          КиноТрекер начинает свою работу как веб-приложение, оптимизированное для планшетов и
          смартфонов. Однако оно также совместимо с ноутбуками и компьютерами. Использование нашего
          сервиса для пользователей абсолютно бесплатно.
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: '#444', my: 4 }} />

      {/* ДОБАВИТЬ РЕАЛИЗАЦИЮ ФУНКЦИОНАЛА */}

      {/* <Box sx={{ mt: 4, padding: { xs: '0px 10px' } }}>
        <Typography variant="h5" gutterBottom>
          Ваша благодарность
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon sx={{ minWidth: { xs: '40px' } }}>
              <Star />
            </ListItemIcon>
            <ListItemText primary="Поставить рейтинг" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ minWidth: { xs: '40px' } }}>
              <Share />
            </ListItemIcon>
            <ListItemText primary="Рекомендовать друзьям" />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ backgroundColor: '#444', my: 4 }} /> */}

      <Box sx={{ mt: 4, padding: { xs: '0px 10px' } }}>
        <Typography variant="h5" gutterBottom>
          Обратная связь
        </Typography>
        <List sx={{ width: 'fit-content' }}>
          <MuiLink
            href="https://t.me/SWED_DIMA"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
          >
            <ListItemButton sx={{ width: 'fit-content' }}>
              <ListItemIcon sx={{ minWidth: { xs: '40px' } }}>
                <Support />
              </ListItemIcon>
              <ListItemText
                primary="Подписаться в Telegram: @SWED_DIMA"
                sx={{ color: 'secondary.contrastText', textDecoration: 'none' }}
              />
            </ListItemButton>
          </MuiLink>

          <MuiLink
            href="mailto:vip-performance37@mail.ru"
            target="_blank"
            sx={{ textDecoration: 'none' }}
          >
            <ListItemButton sx={{ width: 'fit-content' }}>
              <ListItemIcon sx={{ minWidth: { xs: '40px' } }}>
                <Email />
              </ListItemIcon>
              <ListItemText
                primary="vip-performance37@mail.ru"
                sx={{ color: 'secondary.contrastText', textDecoration: 'none' }}
              />
            </ListItemButton>
          </MuiLink>
        </List>
      </Box>

      <Divider sx={{ backgroundColor: '#444', my: 4 }} />

      <Box sx={{ mt: 4, padding: { xs: '0px 10px' } }}>
        <Typography variant="h5" gutterBottom>
          Важное
        </Typography>
        <List sx={{ width: 'fit-content' }}>
          <Link to="/legal-info" style={{ textDecoration: 'none' }}>
            <ListItem>
              <ListItemIcon sx={{ minWidth: { xs: '40px' } }}>
                <PrivacyTip />
              </ListItemIcon>
              <ListItemText
                sx={{ color: 'secondary.contrastText' }}
                primary="Политика конфиденциальности"
              />
            </ListItem>
          </Link>
        </List>
      </Box>

      <Divider sx={{ backgroundColor: '#444', my: 4 }} />

      <Box sx={{ mt: 4, padding: { xs: '0px 10px' } }}>
        <Typography variant="h5" gutterBottom>
          Источники информации
        </Typography>
        <List sx={{ width: 'fit-content' }}>
          {/* <ListItem>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Trakt.tv API" />
          </ListItem> */}
          <ListItemButton component="a" href="https://www.themoviedb.org/" target="_blank">
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="TMDb API" />
          </ListItemButton>
          {/* <ListItem>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="JustWatch" />
          </ListItem> */}
        </List>
      </Box>
    </Stack>
  )
}
