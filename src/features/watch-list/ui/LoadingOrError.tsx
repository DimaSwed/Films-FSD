import { Box, CircularProgress, Typography } from '@mui/material'

interface ILoadingOrErrorProps {
  isLoading: boolean
  isError: boolean
  error?: unknown
}

export const LoadingOrError = ({ isLoading, isError, error }: ILoadingOrErrorProps) => {
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ width: '100%', bgcolor: 'background.paper' }}
      >
        <CircularProgress sx={{ color: 'secondary.contrastText' }} />
      </Box>
    )
  }

  if (isError) {
    console.error('API Error:', error)
    return (
      <Box textAlign="center">
        <Typography variant="h5" color="error">
          Ошибка загрузки данных
        </Typography>
        <Typography variant="body1">
          Не удалось загрузить данные. Пожалуйста, попробуйте снова позже.
        </Typography>
      </Box>
    )
  }

  return null
}
