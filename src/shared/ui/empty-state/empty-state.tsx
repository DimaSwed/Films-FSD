import { Box, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface IEmptyStateProps {
  title?: string
  description?: string | ReactNode
  icon?: ReactNode
  action?: ReactNode
}

export const EmptyState = ({
  title = 'Нет данных',
  description = 'Здесь пока ничего нет',
  icon,
  action
}: IEmptyStateProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      p: 4,
      gap: 2
    }}
  >
    {icon && <Box sx={{ fontSize: 64, color: 'text.secondary', mb: 1 }}>{icon}</Box>}

    <Typography variant="h5" component="div">
      {title}
    </Typography>

    <Typography variant="body1" sx={{ maxWidth: 500 }}>
      {description}
    </Typography>

    {action && <Box sx={{ mt: 2 }}>{action}</Box>}
  </Box>
)
