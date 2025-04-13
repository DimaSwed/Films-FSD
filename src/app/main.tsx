import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AppProviders } from '@/app/providers/providers'
import { App } from './App'
import { Header } from '@/widgets'
import { Sidebar } from '@/widgets'
import '@/app/styles/global.sass'
import { Box } from '@mui/material'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <App />
        <Sidebar />
      </Box>
    </AppProviders>
  </StrictMode>
)
