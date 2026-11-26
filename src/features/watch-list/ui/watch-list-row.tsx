import ViewDayIcon from '@mui/icons-material/ViewDay'
import { Box, Card, CardMedia, Collapse, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { NO_DESCRIPTION_TEXT } from '@/shared/config'
import { RatingDisplay, RemoveButton, ToggleDescriptionButton } from '@/shared/ui'

import { IWatchListCardViewProps } from './watch-list-card.types'

const UNKNOWN = 'Неизвестно'

/** Вид карточки «К просмотру» для экранов от `sm`: слева постер, справа сведения и кнопки. */
export const WatchListRow: FC<IWatchListCardViewProps> = ({
  movie,
  watchProviders,
  actions,
  isDescriptionOpen,
  onToggleDescription,
  onRemove
}) => (
  <Card
    sx={{
      display: 'flex',
      alignItems: 'center',
      mb: 2,
      boxShadow: 4,
      borderRadius: 2,
      bgcolor: 'background.card'
    }}
  >
    {/* Постер и название ведут на одну страницу. Чтобы с клавиатуры и в скринридере ссылка не
        повторялась, постер от них скрыт. */}
    <Link to={`/movie/${movie.id}`} tabIndex={-1} aria-hidden style={{ flexShrink: 0 }}>
      {movie.image ? (
        <CardMedia
          component="img"
          sx={{ width: 150, height: 225 }}
          image={movie.image}
          alt={movie.title}
          loading="lazy"
        />
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 150,
            height: 225,
            bgcolor: 'action.hover'
          }}
        >
          <ViewDayIcon sx={{ fontSize: 60, color: 'grey.500' }} />
        </Box>
      )}
    </Link>
    <Box
      sx={{
        flex: 1,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-start'
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: 'secondary.contrastText', mb: '3px', textAlign: 'center' }}
      >
        <Box
          component={Link}
          to={`/movie/${movie.id}`}
          sx={{
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          <strong>&quot;{movie.title}&quot;</strong>
        </Box>
      </Typography>

      <Stack gap={'2px'}>
        {movie.rating > 0 ? (
          <RatingDisplay value={movie.rating} />
        ) : (
          <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
            <strong>Рейтинг:</strong> Пока нет оценок
          </Typography>
        )}
        <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
          <strong>Год:</strong> {movie.year || UNKNOWN}
        </Typography>
        <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
          <strong>Жанр:</strong> {movie.genre || UNKNOWN}
        </Typography>
      </Stack>

      {/* Над описанием, а не под ним: раскрытое описание не должно сдвигать сервисы */}
      <Box sx={{ mt: 1.5, width: '100%' }}>{watchProviders}</Box>

      <Collapse in={isDescriptionOpen} timeout="auto" unmountOnExit>
        <Typography
          variant="body2"
          sx={{
            color: 'secondary.contrastText',
            mt: 1,
            width: '100%',
            textAlign: 'justify'
          }}
        >
          <strong>Описание:</strong> {movie.description || NO_DESCRIPTION_TEXT}
        </Typography>
      </Collapse>

      <Stack direction="row" mt={2} gap={1} alignItems="center" width={'100%'} flexWrap={'wrap'}>
        <ToggleDescriptionButton isOpen={isDescriptionOpen} onClick={onToggleDescription} />
        {actions}
        <RemoveButton onClick={onRemove} text="Убрать из списка" />
      </Stack>
    </Box>
  </Card>
)
