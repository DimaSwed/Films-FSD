import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { SmallMovieCard, SmallMovieCardSkeleton } from '@/entities/movie'
import { IMovie } from '@/shared/lib'
import { ScrollRow } from '@/shared/ui'

export interface IMovieCategoryProps {
  title: string
  movies: IMovie[]
  /** Ответа ещё не было (`isPending` запроса): скелетоны, если запрос не на паузе. */
  isPending: boolean
  /** Запрос ждёт сети (`isPaused`): сообщение «Нет соединения», загрузка продолжится сама. */
  isPaused?: boolean
  /** Подборка не загрузилась: вместо ряда — сообщение и кнопка повтора. */
  isError?: boolean
  /** Идёт запрос: кнопка «Повторить» выключена и показывает спиннер. */
  isFetching?: boolean
  onRetry?: () => void
  /** Адрес ссылки «Смотреть все»: полная подборка или жанр. */
  to: string
}

const SKELETON_COUNT = 8

/**
 * Ширина карточки по экрану: на телефоне видно две с небольшим — край третьей подсказывает,
 * что ряд листается.
 */
const CARD_WIDTH = { xs: 136, sm: 156, md: 168, xl: 184 }

const messageCardSx = {
  width: { xs: 280, sm: 420 },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 1.5,
  p: 2.5,
  borderRadius: '14px',
  border: '1px dashed',
  borderColor: 'outline.strong',
  color: 'text.secondary'
} as const

export const MovieCategory: FC<IMovieCategoryProps> = ({
  title,
  movies,
  isPending,
  isPaused = false,
  isError = false,
  isFetching = false,
  onRetry,
  to
}) => {
  const hasMovies = movies.length > 0

  // Секцию прячем только после успешного пустого ответа: без сети запрос стоит на паузе
  // (`isPending` и `isPaused`), и пустой ряд здесь — не «фильмов нет»
  if (!isPending && !isPaused && !isError && !hasMovies) return null

  const seeAll = (
    <Button
      component={Link}
      to={to}
      size="small"
      color="inherit"
      endIcon={<ChevronRightIcon />}
      aria-label={`${title}: смотреть все`}
      sx={{
        flexShrink: 0,
        textTransform: 'none',
        fontWeight: 500,
        color: 'accent.main',
        borderRadius: '999px',
        px: 1.5,
        minHeight: 40,
        '& .MuiButton-endIcon': { ml: 0.25 }
      }}
    >
      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
        Смотреть все
      </Box>
      <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
        Все
      </Box>
    </Button>
  )

  let items
  if (hasMovies) {
    items = movies.map((movie) => (
      <Box component="li" key={movie.id} sx={{ width: CARD_WIDTH }}>
        <SmallMovieCard movie={movie} />
      </Box>
    ))
  } else if (isPaused) {
    items = (
      // `role` — на внутреннем блоке: у `li` он заменил бы роль пункта списка.
      // `status`, а не `alert`: на /movies таких рядов 18, срочные объявления шли бы пачкой
      <li>
        <Box role="status" sx={messageCardSx}>
          <Typography variant="body1">
            Нет соединения. Подборка загрузится, когда сеть появится.
          </Typography>
        </Box>
      </li>
    )
  } else if (isError) {
    items = (
      // Об ошибке уже сообщил тост из хука запроса — здесь без live-региона
      <li>
        <Box sx={messageCardSx}>
          <Typography variant="body1">Не удалось загрузить подборку.</Typography>
          {onRetry && (
            <Button
              variant="outlined"
              size="small"
              onClick={onRetry}
              disabled={isFetching}
              startIcon={isFetching ? <CircularProgress size={16} color="inherit" /> : undefined}
              sx={{ textTransform: 'none' }}
            >
              {isFetching ? 'Загружаем…' : 'Повторить'}
            </Button>
          )}
        </Box>
      </li>
    )
  } else {
    items = Array.from({ length: SKELETON_COUNT }, (_, index) => (
      <Box component="li" key={index} sx={{ width: CARD_WIDTH }}>
        <SmallMovieCardSkeleton />
      </Box>
    ))
  }

  return (
    <ScrollRow title={title} action={seeAll}>
      {items}
    </ScrollRow>
  )
}
