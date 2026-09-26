import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'
import { useAuthCallbackHandler } from '@/features/auth'
import { LoadingErrorState, PageShell } from '@/shared/ui'

export function App() {
  useAuthCallbackHandler()

  return (
    <>
      <Header />

      <Box
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundColor: 'background.default',
          color: 'text.primary',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        {/* Контент с прокруткой */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            maxHeight: '100vh'
          }}
        >
          <Suspense
            fallback={
              <PageShell centered>
                <LoadingErrorState isLoading isError={false} />
              </PageShell>
            }
          >
            <Outlet />
          </Suspense>
        </Box>

        {/* Sidebar справа */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            maxWidth: { xs: '50px', md: '280px' },
            width: '100%',
            zIndex: 1000
          }}
        >
          <Sidebar />
        </Box>
      </Box>
    </>
  )
}
