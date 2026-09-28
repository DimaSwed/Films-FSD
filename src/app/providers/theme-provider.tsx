import CloseIcon from '@mui/icons-material/Close'
import { CssBaseline, IconButton, ThemeProvider } from '@mui/material'
import { SnackbarProvider, closeSnackbar } from 'notistack'
import { FC, ReactNode, useEffect } from 'react'

import { ThemeContext, useTheme } from '@/features/theme'

import { lightTheme, darkTheme } from '../styles/theme'

interface IThemeSnackbarProviderProps {
  children: ReactNode
}

export const ThemeSnackbarProvider: FC<IThemeSnackbarProviderProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme()
  const muiTheme = theme === 'dark' ? darkTheme : lightTheme

  // Цвет системной полосы (PWA/браузер) совпадает с шапкой активной темы
  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', muiTheme.palette.primary.main)
  }, [muiTheme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={muiTheme}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          preventDuplicate
          classes={{ containerAnchorOriginTopRight: 'snackbar-safe-top' }}
          action={(snackbarId) => (
            <IconButton size="small" color="inherit" onClick={() => closeSnackbar(snackbarId)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        >
          <CssBaseline />
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
