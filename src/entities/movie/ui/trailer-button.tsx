import CloseIcon from '@mui/icons-material/Close'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { Box, Button, Dialog, IconButton, Typography } from '@mui/material'
import { FC, useId, useState } from 'react'

import { getTrailerLabel } from '../lib'
import type { IMovieTrailer } from '../model'

import { TrailerFrame } from './trailer-frame'
import { YoutubeLinkButton } from './youtube-link-button'

interface ITrailerButtonProps {
  trailer: IMovieTrailer
  title: string
}

/** Кнопка трейлера и окно с плеером: YouTube загружается только после нажатия, закрытие выгружает его. */
export const TrailerButton: FC<ITrailerButtonProps> = ({ trailer, title }) => {
  const [isOpen, setIsOpen] = useState(false)
  const titleId = useId()
  const label = getTrailerLabel(trailer).toLowerCase()

  const close = () => setIsOpen(false)

  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        startIcon={<PlayArrowRoundedIcon />}
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
      >
        Смотреть {label}
      </Button>

      <Dialog
        open={isOpen}
        onClose={close}
        fullWidth
        maxWidth={false}
        aria-labelledby={titleId}
        slotProps={{
          paper: {
            sx: {
              bgcolor: 'common.black',
              color: 'common.white',
              backgroundImage: 'none',
              m: { xs: 1, sm: 4 },
              width: { xs: 'calc(100% - 16px)', sm: 'calc(100% - 64px)' },
              // На низком экране (телефон в ландшафте) ширину ограничивает высота: ролик виден целиком
              maxWidth: 'min(900px, calc((100dvh - 140px) * 16 / 9))'
            }
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 2, pr: 1, py: 0.5 }}>
          <Typography id={titleId} variant="h6" component="h2" noWrap sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <YoutubeLinkButton trailer={trailer} title={title} />
          <IconButton color="inherit" aria-label={`Закрыть ${label}`} onClick={close}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ position: 'relative', aspectRatio: '16 / 9' }}>
          <TrailerFrame trailer={trailer} title={title} />
        </Box>
      </Dialog>
    </>
  )
}
