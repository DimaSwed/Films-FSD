import PersonIcon from '@mui/icons-material/Person'
import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { ScrollRow } from '@/shared/ui'

import type { ICastMember } from '../model'

interface IMovieCastProps {
  cast: ICastMember[]
}

const HOVER = '@media (hover: hover)'
const ZOOM = '@media (hover: hover) and (prefers-reduced-motion: no-preference)'

/** Ряд «Актёры»: карточка ведёт на страницу актёра. Без данных секция не рисуется. */
export const MovieCast: FC<IMovieCastProps> = ({ cast }) =>
  cast.length > 0 && (
    <ScrollRow title="Актёры">
      {cast.map(({ id, creditId, name, character, photo }) => (
        <Box component="li" key={creditId} sx={{ width: 110 }}>
          <Box
            component={Link}
            to={`/person/${id}`}
            sx={{
              display: 'block',
              color: 'inherit',
              textDecoration: 'none',
              borderRadius: '10px',
              '&:focus-visible': {
                outline: '3px solid',
                outlineColor: 'accent.main',
                outlineOffset: '3px'
              },
              // Подчёркивание — не движение: оно остаётся и при «уменьшении движения»
              [HOVER]: {
                '&:hover .movie-cast__name': {
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px'
                }
              },
              [ZOOM]: { '&:hover .movie-cast__photo': { transform: 'scale(1.04)' } }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                aspectRatio: '2 / 3',
                borderRadius: '10px',
                overflow: 'hidden',
                bgcolor: 'action.hover'
              }}
            >
              {photo ? (
                <Box
                  component="img"
                  src={photo}
                  // Имя написано под фото и попадает в название ссылки
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="movie-cast__photo"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 300ms ease-out'
                  }}
                />
              ) : (
                <PersonIcon sx={{ fontSize: 48, color: 'grey.500' }} />
              )}
            </Box>
            <Typography
              variant="body2"
              fontWeight="bold"
              className="movie-cast__name"
              sx={{ mt: 1, overflowWrap: 'anywhere' }}
            >
              {name}
            </Typography>
            {character && (
              <Typography
                variant="caption"
                component="p"
                sx={{ mt: 0.5, opacity: 0.75, overflowWrap: 'anywhere' }}
              >
                {character}
              </Typography>
            )}
          </Box>
        </Box>
      ))}
    </ScrollRow>
  )
