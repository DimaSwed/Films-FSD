import '@fontsource/ubuntu/300.css'
import '@fontsource/ubuntu/400.css'
import '@fontsource/ubuntu/500.css'
import '@fontsource/ubuntu/700.css'
import { createTheme, ThemeOptions } from '@mui/material/styles'

const commonSettings: ThemeOptions = {
  breakpoints: { values: { xs: 320, sm: 600, md: 900, lg: 1200, xl: 1440 } },
  typography: {
    fontFamily: 'Ubuntu, sans-serif',

    h1: {
      fontSize: '100px',
      transition: 'font-size 2s ease',
      '@media (max-width:1200px)': { fontSize: '80px' },
      '@media (max-width:900px)': { fontSize: '65px' },
      '@media (max-width:600px)': { fontWeight: 500, fontSize: '50px' },
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: '130%',
      textTransform: 'none'
    },
    h2: {
      fontSize: '85px',
      transition: 'font-size 2s ease',
      '@media (max-width:1200px)': { fontSize: '70px' },
      '@media (max-width:900px)': { fontSize: '50px' },
      '@media (max-width:600px)': { fontSize: '35px' },
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: '130%',
      letterSpacing: 0,
      textTransform: 'none'
    },
    h3: {
      fontSize: '70px',
      transition: 'font-size 2s ease',
      '@media (max-width:1200px)': { fontSize: '60px' },
      '@media (max-width:900px)': { fontSize: '45px' },
      '@media (max-width:600px)': { fontSize: '30px' },
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: '42px',
      letterSpacing: 0,
      textTransform: 'none'
    },
    h4: {
      fontSize: '55px',
      transition: 'font-size 2s ease',
      '@media (max-width:1200px)': { fontSize: '40px' },
      '@media (max-width:900px)': { fontSize: '35px' },
      '@media (max-width:600px)': { fontSize: '30px' },
      fontWeight: 500,
      fontStyle: 'normal',
      letterSpacing: 0,
      textTransform: 'none'
    },
    h5: {
      fontSize: '40px',
      transition: 'font-size 2s ease',
      '@media (max-width:1200px)': { fontSize: '28px' },
      '@media (max-width:900px)': { fontSize: '25px' },
      '@media (max-width:600px)': { fontSize: '23px' },
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: '130%',
      textTransform: 'none',
      letterSpacing: 0,
      textDecoration: 'none'
    },
    h6: {
      fontFamily: 'Open Sans, sans-serif',
      fontSize: '25px',
      transition: 'font-size 2s ease',
      '@media (max-width:1200px)': { fontSize: '18px' },
      '@media (max-width:900px)': { fontSize: '16px' },
      '@media (max-width:600px)': { fontSize: '14px' },
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: '130%',
      textTransform: 'none',
      textDecoration: 'none'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'white',
          color: 'white'
        }
      }
    }
  }
}

const lightTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'light',
    primary: {
      light: '#64b5f6', // Light Blue 300
      main: '#1976d2', // Blue 700
      dark: '#0d47a1', // Blue 900
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ff4081', // Pink A200
      main: '#f50057', // Pink A400
      dark: '#c51162', // Pink A700
      contrastText: '#000000'
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5'
    },
    text: {
      primary: '#ffffff',
      secondary: '#000000'
    }
  }
})

const darkTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'dark',
    primary: {
      light: '#484848', // Light grey for primary light
      main: '#1c1c1c', // Main color
      dark: '#000000', // Darker shade for primary dark
      contrastText: '#ffffff' // White text for contrast
    },
    secondary: {
      light: '#484848', // Light grey for secondary light
      main: '#1c1c1c', // Secondary color same as main color
      dark: '#000000', // Darker shade for secondary dark
      contrastText: '#ffffff' // White text for contrast
    },
    background: {
      default: '#0d0d0d', // Main page background color
      paper: '#1d1d1d' // Paper background color
    },
    text: {
      primary: '#ffffff', // Primary text color
      secondary: '#000000' // Secondary text color
    }
  }
})

export { darkTheme, lightTheme }
