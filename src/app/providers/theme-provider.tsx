import { FC, ReactNode } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { lightTheme, darkTheme } from '@/app/styles/theme'
import { ThemeContext } from '@/features/theme/model/theme-context'
import { useTheme } from '@/features/theme/model/use-theme'

interface IThemeSnackbarProviderProps {
  children: ReactNode
}

export const ThemeSnackbarProvider: FC<IThemeSnackbarProviderProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme()
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          preventDuplicate
        >
          <CssBaseline />
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
