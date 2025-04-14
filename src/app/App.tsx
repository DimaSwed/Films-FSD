import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { Header } from '@/widgets'
import { Sidebar } from '@/widgets'
import { useAuthCallbackHandler } from '@/shared/utils/use-auth-callback-handler'

export function App() {
  useAuthCallbackHandler()

  return (
    <>
      <Header />

      <Box
        width="100%"
        minHeight="100vh"
        sx={{ backgroundColor: 'background.paper', display: 'flex' }}
      >
        <Outlet />
        <Sidebar />
      </Box>
    </>
  )
}
