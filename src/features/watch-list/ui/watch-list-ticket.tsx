import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import StarIcon from '@mui/icons-material/Star'
import ViewDayIcon from '@mui/icons-material/ViewDay'
import { Box, Button, Collapse, IconButton, Typography } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { NO_DESCRIPTION_TEXT } from '@/shared/config'
import { isGoodRating } from '@/shared/lib'

import { IWatchListCardViewProps } from './watch-list-card.types'
import { ticketStyles } from './watch-list-ticket.styles'

const UNKNOWN = '—'

/**
 * Вид карточки «К просмотру» для телефона. Похож на кинобилет: сверху кадр из фильма с постером,
 * снизу отрывная часть с кнопками.
 */
export const WatchListTicket: FC<IWatchListCardViewProps> = ({
  movie,
  watchProviders,
  actions,
  isDescriptionOpen,
  onToggleDescription,
  onRemove
}) => {
  const hasRating = movie.rating > 0
  const ratingColor = isGoodRating(movie.rating) ? 'success.light' : 'warning.light'

  return (
    <Box component="article" sx={ticketStyles.root}>
      <Box sx={ticketStyles.scene}>
        {movie.backdrop && (
          <Box
            component="img"
            src={movie.backdrop}
            alt=""
            loading="lazy"
            sx={ticketStyles.backdrop}
          />
        )}
        <Box sx={ticketStyles.shade} />

        <Box sx={ticketStyles.poster}>
          {movie.image ? (
            <img src={movie.image} alt={`Постер фильма «${movie.title}»`} loading="lazy" />
          ) : (
            <ViewDayIcon sx={{ fontSize: 40, color: 'grey.500' }} />
          )}
        </Box>

        <Box sx={ticketStyles.info}>
          <Typography variant="h5" component="h4" sx={ticketStyles.title}>
            <Box component={Link} to={`/movie/${movie.id}`} sx={ticketStyles.link}>
              {movie.title}
            </Box>
          </Typography>
          {movie.genre && (
            <Typography variant="body2" sx={ticketStyles.genre}>
              {movie.genre}
            </Typography>
          )}

          <Box component="dl" sx={ticketStyles.facts}>
            <Box sx={ticketStyles.fact}>
              <Typography component="dt" variant="caption" sx={ticketStyles.factLabel}>
                Рейтинг
              </Typography>
              <Box component="dd" sx={ticketStyles.factValue}>
                {hasRating ? (
                  <>
                    <StarIcon sx={{ fontSize: 18, color: ratingColor }} />
                    {movie.rating.toFixed(1)}
                  </>
                ) : (
                  UNKNOWN
                )}
              </Box>
            </Box>
            <Box sx={ticketStyles.fact}>
              <Typography component="dt" variant="caption" sx={ticketStyles.factLabel}>
                Год
              </Typography>
              <Box component="dd" sx={ticketStyles.factValue}>
                {movie.year || UNKNOWN}
              </Box>
            </Box>
          </Box>
        </Box>

        <IconButton
          aria-label={`Убрать из списка: ${movie.title}`}
          onClick={onRemove}
          sx={ticketStyles.remove}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <Box sx={ticketStyles.stub}>
        <Box sx={ticketStyles.providers}>{watchProviders}</Box>

        <Collapse in={isDescriptionOpen} timeout="auto" unmountOnExit>
          <Typography variant="body2" sx={ticketStyles.description}>
            {movie.description || NO_DESCRIPTION_TEXT}
          </Typography>
        </Collapse>

        <Box sx={ticketStyles.buttons}>
          <Button
            color="inherit"
            endIcon={<ExpandMoreIcon sx={ticketStyles.chevron(isDescriptionOpen)} />}
            aria-expanded={isDescriptionOpen}
            onClick={onToggleDescription}
            sx={ticketStyles.toggle}
          >
            Описание
          </Button>
          {actions}
        </Box>
      </Box>
    </Box>
  )
}
