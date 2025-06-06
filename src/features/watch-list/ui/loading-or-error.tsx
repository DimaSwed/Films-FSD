// import { Box, CircularProgress, Typography } from '@mui/material'

import { LoadingErrorState } from '@/shared/ui'

interface ILoadingOrErrorProps {
  isLoading: boolean
  isError: boolean
  error?: unknown
}

export const LoadingOrError = ({ isLoading, isError, error }: ILoadingOrErrorProps) => (
  <LoadingErrorState
    isLoading={isLoading}
    isError={isError}
    error={error}
    loadingText="Загружаем ваш список просмотра..."
    errorTitle="Ошибка загрузки списка"
    errorDescription="Не удалось загрузить ваш список фильмов к просмотру"
  />
)
//   {
//   if (isLoading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         mt={10}
//         sx={{ width: '100%', bgcolor: 'background.paper' }}
//       >
//         <CircularProgress sx={{ color: 'primary.light' }} />
//       </Box>
//     )
//   }

//   if (isError) {
//     console.error('API Error:', error)
//     return (
//       <Box textAlign="center">
//         <Typography variant="h5" color="error">
//           Ошибка загрузки данных
//         </Typography>
//         <Typography variant="body1">
//           Не удалось загрузить данные. Пожалуйста, попробуйте снова позже.
//         </Typography>
//       </Box>
//     )
//   }

//   return null
// }
