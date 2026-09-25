import { FC, ReactNode } from 'react'
import { Box } from '@mui/material'

interface IMovieGridProps {
  children: ReactNode
}

/** Сетка карточек: 2 колонки на телефоне, дальше подстраивается под ширину. */
export const MovieGrid: FC<IMovieGridProps> = ({ children }) => (
  <Box
    sx={{
      display: 'grid',
      gap: { xs: 1.5, sm: 2 },
      gridTemplateColumns: {
        xs: 'repeat(2, minmax(0, 1fr))',
        sm: 'repeat(auto-fill, minmax(200px, 1fr))'
      }
    }}
  >
    {children}
  </Box>
)
