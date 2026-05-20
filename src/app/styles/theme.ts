import '@fontsource/ubuntu/300.css'
import '@fontsource/ubuntu/400.css'
import '@fontsource/ubuntu/500.css'
import '@fontsource/ubuntu/700.css'
import { createTheme, ThemeOptions } from '@mui/material/styles'

const commonSettings: ThemeOptions = {
  breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1440 } },
  typography: {
    fontFamily: 'Ubuntu, sans-serif',

    // Hero — 404, крупные промо-блоки
    h1: {
      fontSize: '60px',
      '@media (max-width:1200px)': { fontSize: '48px' },
      '@media (max-width:900px)': { fontSize: '40px' },
      '@media (max-width:600px)': { fontSize: '34px' },
      fontWeight: 400,
      lineHeight: '115%',
      textTransform: 'none'
    },
    // Крупный заголовок страницы
    h2: {
      fontSize: '40px',
      '@media (max-width:1200px)': { fontSize: '34px' },
      '@media (max-width:900px)': { fontSize: '28px' },
      '@media (max-width:600px)': { fontSize: '24px' },
      fontWeight: 500,
      lineHeight: '115%',
      textTransform: 'none'
    },
    // Заголовок большинства страниц (HomePage, MoviesPage, SearchPage и др.)
    h3: {
      fontSize: '34px',
      '@media (max-width:1200px)': { fontSize: '28px' },
      '@media (max-width:900px)': { fontSize: '24px' },
      '@media (max-width:600px)': { fontSize: '20px' },
      fontWeight: 500,
      lineHeight: '115%',
      textTransform: 'none'
    },
    // Заголовок секции / крупного блока
    h4: {
      fontSize: '24px',
      '@media (max-width:1200px)': { fontSize: '22px' },
      '@media (max-width:900px)': { fontSize: '20px' },
      '@media (max-width:600px)': { fontSize: '18px' },
      fontWeight: 500,
      lineHeight: '120%',
      textTransform: 'none'
    },
    // Заголовок карточки / виджета / модалки
    h5: {
      fontSize: '20px',
      '@media (max-width:1200px)': { fontSize: '18px' },
      '@media (max-width:900px)': { fontSize: '17px' },
      '@media (max-width:600px)': { fontSize: '16px' },
      fontWeight: 500,
      lineHeight: '120%',
      textTransform: 'none'
    },
    // Мелкий заголовок / body-уровень
    h6: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '120%',
      textTransform: 'none'
    },

    // Основной текст страницы (body3 в YeaHub)
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '130%'
    },
    // Вторичный текст, мета, чипы (body2 в YeaHub)
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '120%'
    },
    // Акцентированный лейбл / подпись поля (body2-accent в YeaHub)
    subtitle1: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '120%'
    },
    subtitle2: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '120%'
    },
    // Мелкие подписи, бейджи (body1 в YeaHub)
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '120%'
    }
  }
}

const lightTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'light',
    primary: {
      light: '#5b79c4',
      main: '#274898',
      dark: '#1a3070',
      contrastText: '#FFFFFF'
    },
    secondary: {
      light: '#e5c69a',
      main: '#c5995b',
      dark: '#996a28',
      contrastText: '#303030'
    },
    error: {
      light: '#c4553d',
      main: '#993b28',
      dark: '#7a2d1d',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#faf1e6',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#9d9d9d'
    },
    divider: '#d9d9d9'
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: '#1a1a1a',
          backgroundColor: '#faf1e6'
        },
        ':root': {
          /* Backgrounds */
          '--background-app': '#faf1e6',
          '--background-block': '#FFFFFF',
          '--background-button': '#e6eafa',
          '--background-light-hover': '#ffffdf',
          '--background-light-chip': '#e6eafa',
          '--background-light-block': '#faf1e6',
          '--background-accent-block': '#1a3070',
          '--background-primary': '#274898',
          '--background-progress-bar': '#9ab0e5',
          '--background-skeleton': '#d9d9d9',
          '--background-nav-item': '#e6eafa',
          '--background-nav-item-hover': '#faf1e6',
          '--background-modal-overlay': 'rgb(26 48 112 / 40%)',

          /* Text */
          '--text-color-primary': '#1a1a1a',
          '--text-color-bright': '#000000',
          '--text-color-light': '#474747',
          '--text-color-lighter': '#5E5E5E',
          '--text-color-lightest': '#9d9d9d',
          '--text-color-the-lightest': '#b0b0b0',
          '--text-color-more-lightest': '#d9d9d9',
          '--text-color-white': '#FFFFFF',
          '--text-color-link-active': '#274898',
          '--text-color-link-disabled': '#9ab0e5',
          '--text-color-red': '#993b28',

          /* Borders */
          '--border-color': '#d9d9d9',
          '--border-right-color': '#9d9d9d',
          '--border-image-hover': '#274898',
          '--border-input': '#d9d9d9',
          '--border-focus-blue': '#5b79c4',

          /* Shadows */
          '--main-shadow': '0px 4px 10px rgb(39 72 152 / 12%)',
          '--focus-shadow': '0 0 0 3px #e6eafa',
          '--focus-shadow-error': '0 0 0 3px #f5d5cc',
          '--focus-shadow-valid': '0 0 0 3px #dff0cc',

          /* Font sizes */
          '--font-size-h-xxl': '60px',
          '--font-size-h-l': '40px',
          '--font-size-large-34': '34px',
          '--font-size-h-m': '36px',
          '--font-size-large-30': '30px',
          '--font-size-large-28': '28px',
          '--font-size-h-s': '24px',
          '--font-size-h-xs': '20px',
          '--font-size-p-l': '18px',
          '--font-size-p-m': '16px',
          '--font-size-h-xxs': '14px',
          '--font-size-p-s': '14px',
          '--font-size-p-xs': '12px',
          '--font-size-p-xss': '10px',
          '--font-size-p-xxs': '8px'
        }
      }
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
      light: '#616161', // Grey 700
      main: '#424242', // Grey 800
      dark: '#212121', // Grey 900
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
