import { Box } from '@mui/material'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'
import { useAuthCallbackHandler } from '@/features/auth'
import { LoadingErrorState, PageShell } from '@/shared/ui'

export function App() {
  useAuthCallbackHandler()

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <Header />

      <Box
        width="100%"
        sx={{
          flex: 1,
          minHeight: 0,
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
            height: '100%',
            overflowY: 'auto'
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
            height: '100%',
            maxWidth: { xs: '50px', md: '280px' },
            width: '100%',
            zIndex: 1000
          }}
        >
          <Sidebar />
        </Box>
      </Box>
    </Box>
  )
}
