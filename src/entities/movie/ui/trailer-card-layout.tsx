import { Box, Card } from '@mui/material'
import { FC, ReactNode } from 'react'

interface ITrailerCardLayoutProps {
  /** Верх карточки — плеер или его заглушка (16:9). */
  media: ReactNode
  /** Подпись под роликом. */
  children: ReactNode
  /** Кнопка справа от подписи. */
  action?: ReactNode
}

/** Общий каркас карточки трейлера во всех состояниях: сетка не прыгает при их смене. */
export const TrailerCardLayout: FC<ITrailerCardLayoutProps> = ({ media, children, action }) => (
  <Card
    component="article"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      bgcolor: 'background.default',
      color: 'secondary.contrastText',
      borderRadius: '15px',
      boxShadow: 3
    }}
  >
    <Box sx={{ position: 'relative', aspectRatio: '16 / 9', bgcolor: 'common.black' }}>{media}</Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5, flexGrow: 1, minHeight: 64 }}>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>{children}</Box>
      {action}
    </Box>
  </Card>
)
