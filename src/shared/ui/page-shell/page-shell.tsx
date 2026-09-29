import { Box, SxProps, Theme } from '@mui/material'
import { FC, ReactNode } from 'react'

interface IPageShellProps {
  children: ReactNode
  /** Центрирует содержимое — для состояний загрузки, ошибки и пустых страниц. */
  centered?: boolean
  sx?: SxProps<Theme>
}

/**
 * Общая оболочка страницы. Держит фон и высоту одинаковыми во всех состояниях
 * (загрузка / ошибка / данные), чтобы фон не схлопывался и не прыгал после загрузки.
 */
export const PageShell: FC<IPageShellProps> = ({ children, centered = false, sx = [] }) => (
  <Box
    component="main"
    sx={[
      {
        color: 'secondary.contrastText',
        bgcolor: 'background.paper',
        width: '100%',
        minHeight: '100%',
        overflow: 'hidden'
      },
      centered && { display: 'flex', alignItems: 'center', justifyContent: 'center' },
      ...(Array.isArray(sx) ? sx : [sx])
    ]}
  >
    {children}
  </Box>
)
