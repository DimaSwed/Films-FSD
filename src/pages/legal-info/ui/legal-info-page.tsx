import { Stack, Container, Typography, Divider, Link } from '@mui/material'
import { FC, ReactNode } from 'react'

import { JustWatchAttribution, PageMeta, TmdbAttribution } from '@/shared/ui'

const CONTACT_EMAIL = 'vip-performance37@mail.ru'

const linkSx = { textDecoration: 'none', color: '#1976d2' }

const Section: FC<{ title: string; children: ReactNode }> = ({ title, children }) => (
  <>
    <Divider sx={{ backgroundColor: '#444', my: 4 }} />
    <Typography variant="h6" component="h2" gutterBottom>
      {title}
    </Typography>
    <Stack gap={1.5}>{children}</Stack>
  </>
)

export const LegalInfoPage: FC = () => {
  return (
    <>
      <PageMeta
        title="Правовая информация"
        description="Источники данных, конфиденциальность, авторские права и обратная связь КиноТрекера."
      />
      <Stack
        sx={{
          padding: { xs: '10px', sm: '30px' },
          color: 'secondary.contrastText',
          bgcolor: 'background.paper',
          width: '100%'
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ mt: 2, color: 'secondary.contrastText', bgcolor: 'background.paper' }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Правовая информация
          </Typography>

          <Typography>
            КиноТрекер — бесплатный справочный сервис для поиска фильмов и ведения личных списков.
            Он не является онлайн-кинотеатром: мы не размещаем и не распространяем фильмы и не
            продаём билеты. Информация может быть неполной или устаревшей, в том числе данные о том,
            где можно посмотреть фильм.
          </Typography>

          <Section title="Источники данных">
            <Typography>
              Каталог фильмов, описания, постеры, рейтинги и списки пользователей предоставляет
              TMDB. КиноТрекер не имеет прав на этот контент: он принадлежит правообладателям.
            </Typography>
            <TmdbAttribution />
            <Typography>
              Сведения о доступности фильмов в онлайн-кинотеатрах TMDB получает от JustWatch.
            </Typography>
            <JustWatchAttribution />
          </Section>

          <Section title="Конфиденциальность">
            <Typography>
              Вход выполняется на сайте TMDB: КиноТрекер не получает ваш пароль. Своей базы
              пользователей и аналитики у сервиса нет. Что сохраняется в вашем браузере:
            </Typography>
            <Typography component="ul" sx={{ pl: 3, m: 0, listStyleType: 'disc' }}>
              <li>
                cookie <code>session_id</code> — идентификатор сессии TMDB на 7 дней. Нужен, чтобы
                показывать ваш профиль и списки «К просмотру» и «Избранное». Удаляется при выходе;
              </li>
              <li>
                cookie <code>theme</code> — выбранная светлая или тёмная тема;
              </li>
              <li>
                <code>localStorage</code> — последние запросы быстрого поиска (до 10). Хранятся
                только на вашем устройстве.
              </li>
            </Typography>
            <Typography>
              Списки «К просмотру» и «Избранное» хранятся на серверах TMDB в вашем аккаунте, на них
              распространяется политика TMDB. Запросы к данным проходят через наш домен, хостинг и
              TMDB обрабатывают технические данные запросов (например, IP-адрес). На странице
              «Трейлеры» картинки-превью загружаются с YouTube, а плеер YouTube там и на странице
              фильма — только после нажатия. Плеер может использовать cookie YouTube, в том числе
              ваш вход в аккаунт Google; на него действует политика YouTube. Чтобы стереть данные в
              браузере, выйдите из аккаунта и очистите данные сайта; аккаунт TMDB удаляется на
              themoviedb.org.
            </Typography>
          </Section>

          <Section title="Авторские права">
            <Typography>
              Названия, постеры, описания и трейлеры фильмов остаются собственностью законных
              владельцев. Оформление и исходный код КиноТрекера защищены авторским правом; их
              воспроизведение и распространение без согласия автора не допускаются.
            </Typography>
          </Section>

          <Section title="Обратная связь и уязвимости">
            <Typography>
              Если вы нашли ошибку или уязвимость, напишите нам на{' '}
              <Link sx={linkSx} href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </Link>
              . Пожалуйста, дайте нам время исправить проблему до публичного раскрытия: мы
              постараемся быстро разобраться и сообщить о результате.
            </Typography>
          </Section>
        </Container>
      </Stack>
    </>
  )
}
