import { Support, Email, PrivacyTip } from '@mui/icons-material'
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
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { UserSubscriptionInfo } from '@/features/auth'
import { JustWatchAttribution, PageMeta, TmdbAttribution } from '@/shared/ui'

export const SettingsPage: FC = () => {
  return (
    <>
      <PageMeta
        title="Дополнительно"
        description="О КиноТрекере, обратная связь, правовая информация и источники данных."
      />
      <Stack
        sx={{
          padding: { xs: '10px 0px', sm: '15px', md: '30px' },
          color: 'secondary.contrastText',
          bgcolor: 'background.paper',
          width: '100%'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
          Дополнительно
        </Typography>

        <UserSubscriptionInfo />

        <Divider sx={{ backgroundColor: 'outline.soft' }} />

        <Box sx={{ mt: 4, padding: { xs: '0px 10px' } }}>
          <Typography variant="h5" component="h2" gutterBottom>
            О нас
          </Typography>
          <Typography variant="body2">
            КиноТрекер помогает выбрать фильм и узнать, где его можно легально посмотреть в России.
            Подборки, трейлеры и поиск с фильтрами по жанру, стране и году выпуска покажут, что
            нового в кино, а карточка фильма расскажет о нём подробнее: описание, актёры, похожие
            фильмы и онлайн-кинотеатры, где он доступен по подписке, бесплатно, в аренду или для
            покупки.
            <br />
            <br />
            Войдите через аккаунт TMDB, чтобы вести списки «К просмотру», «Избранное» и
            «Просмотрено» и ставить фильмам оценки. Списки хранятся в вашем аккаунте TMDB.
            <br />
            <br />
            КиноТрекер — веб-приложение, рассчитанное в первую очередь на смартфоны и планшеты, но
            работает и на компьютере. Его можно установить на главный экран телефона. Пользоваться
            сервисом можно бесплатно.
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: 'outline.soft', my: 4 }} />

        <Box sx={{ mt: 4, padding: { xs: '0px 10px' } }}>
          <Typography variant="h5" component="h2" gutterBottom>
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

        <Divider sx={{ backgroundColor: 'outline.soft', my: 4 }} />

        <Box sx={{ mt: 4, padding: { xs: '0px 10px' } }}>
          <Typography variant="h5" component="h2" gutterBottom>
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

        <Divider sx={{ backgroundColor: 'outline.soft', my: 4 }} />

        <Box sx={{ mt: 4, padding: { xs: '0px 10px' } }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Источники информации
          </Typography>
          <Stack gap={1}>
            <TmdbAttribution />
            <JustWatchAttribution />
          </Stack>
        </Box>
      </Stack>
    </>
  )
}
