import { FC, ReactNode } from 'react'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { lightTheme } from '@/app/styles/theme'

interface IThemeSnackbarProviderProps {
  children: ReactNode
}

export const ThemeSnackbarProvider: FC<IThemeSnackbarProviderProps> = ({ children }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        preventDuplicate
      >
        <CssBaseline />
        {children}
      </SnackbarProvider>
    </ThemeProvider>
  )
}
