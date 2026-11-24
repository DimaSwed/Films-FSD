import PersonIcon from '@mui/icons-material/Person'
import { Box, Typography } from '@mui/material'
import { FC } from 'react'

import { ScrollRow } from '@/shared/ui'

import type { ICastMember } from '../model'

interface IMovieCastProps {
  cast: ICastMember[]
}

/** Ряд «Актёры». Без данных секция не рисуется. */
export const MovieCast: FC<IMovieCastProps> = ({ cast }) =>
  cast.length > 0 && (
    <ScrollRow title="Актёры">
      {cast.map(({ creditId, name, character, photo }) => (
        <Box component="li" key={creditId} sx={{ width: 110 }}>
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
                // Имя написано под фото
                alt=""
                loading="lazy"
                decoding="async"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <PersonIcon sx={{ fontSize: 48, color: 'grey.500' }} />
            )}
          </Box>
          <Typography variant="body2" fontWeight="bold" sx={{ mt: 1, overflowWrap: 'anywhere' }}>
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
      ))}
    </ScrollRow>
  )
