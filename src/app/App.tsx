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
      <Box sx={{ display: 'flex' }}>
        <Box width="100%" minHeight="100vh" p={4} sx={{ backgroundColor: 'background.paper' }}>
          <Outlet />
        </Box>
        <Sidebar />
      </Box>
    </>
  )
}
