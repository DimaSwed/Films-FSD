import { Box, CircularProgress, Typography, Button } from '@mui/material'
import { ReactNode } from 'react'

interface ILoadingErrorStateProps {
  isLoading: boolean
  isError: boolean
  error?: unknown
  loadingText?: string
  errorTitle?: string
  errorDescription?: string
  retry?: () => void
  customLoading?: ReactNode
  customError?: ReactNode
}

export const LoadingErrorState = ({
  isLoading,
  isError,
  error,
  loadingText = 'Загрузка...',
  errorTitle = 'Ошибка загрузки данных',
  errorDescription = 'Не удалось загрузить данные. Пожалуйста, попробуйте снова позже.',
  retry,
  customLoading,
  customError
}: ILoadingErrorStateProps) => {
  if (isLoading) {
    return (
      customLoading ?? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
          p={4}
          sx={{ width: '100%', bgcolor: 'background.paper' }}
        >
          <CircularProgress sx={{ color: 'primary.light' }} />
          <Typography variant="body1" color="text.primary">
            {loadingText}
          </Typography>
        </Box>
      )
    )
  }

  if (isError) {
    console.error('API Error:', error)
    return (
      customError ?? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
          p={4}
          textAlign="center"
        >
          <Typography variant="h5" color="error">
            {errorTitle}
          </Typography>
          <Typography variant="body1" color="text.primary">
            {errorDescription}
          </Typography>
          {retry && (
            <Button variant="outlined" onClick={retry} sx={{ mt: 2 }}>
              Попробовать снова
            </Button>
          )}
        </Box>
      )
    )
  }

  return null
}
