import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProviders } from '@/app/providers/providers'
import { App } from './App'
import { Header } from '@/widgets'
import '@/app/styles/global.sass'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <Header />
      <App />
    </AppProviders>
  </StrictMode>
)
