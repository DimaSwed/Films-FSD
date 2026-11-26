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

// Шапка и сайдбар тёмные в обеих темах, поэтому и наведение одно
const NAVIGATION_HOVER = 'rgba(255, 255, 255, 0.12)'

/**
 * Палитра светлой темы «Киноварь и русский зелёный». Три цвета чуть темнее исходных ради контраста
 * не ниже 4,5: на `RATING_*` читается и белый, и чёрный текст, а `UMBER` — на любом фоне страницы.
 */
const VERMILION = '#c04034'
const CHESTNUT = '#982c22'
const RUSSIAN_GREEN = '#5d8c69'
const UMBER = '#806055'
const ROSE_BROWN = '#a37669'
const CHARCOAL = '#161616'
const WHITE = '#ffffff'

const RATING_GREEN = '#547e5f'
const RATING_BROWN = '#936e62'

const POSTER_OVERLAY = { main: 'rgba(0, 0, 0, 0.72)', hover: 'rgba(0, 0, 0, 0.85)' }

const lightTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'light',
    primary: {
      light: '#cf483a',
      main: VERMILION,
      dark: CHESTNUT,
      contrastText: WHITE
    },
    secondary: {
      light: '#7fa98a',
      main: RUSSIAN_GREEN,
      dark: '#466b50',
      contrastText: CHARCOAL // этим цветом набран почти весь текст на страницах
    },
    error: {
      light: '#b5483d',
      main: CHESTNUT,
      dark: '#701d16',
      contrastText: WHITE
    },
    warning: {
      light: ROSE_BROWN,
      main: RATING_BROWN,
      dark: '#6e5048',
      contrastText: WHITE
    },
    success: {
      light: RUSSIAN_GREEN,
      main: RATING_GREEN,
      dark: '#41634b',
      contrastText: WHITE
    },
    background: {
      default: '#f1e7e0',
      paper: '#fbf7f4',
      card: WHITE
    },
    text: {
      primary: CHARCOAL,
      secondary: UMBER
    },
    divider: '#e3d5cd',
    navigation: { main: CHARCOAL, hover: NAVIGATION_HOVER, contrastText: WHITE },
    outline: { strong: ROSE_BROWN, soft: '#e3d5cd' },
    accent: { main: CHESTNUT },
    rating: { good: RATING_GREEN, average: RATING_BROWN },
    overlay: POSTER_OVERLAY
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          variants: [
            {
              // Надпись чёрная: на `secondary.dark`, который MUI берёт для наведения, она не читается
              props: { variant: 'contained', color: 'secondary' },
              style: { '&:hover': { backgroundColor: theme.palette.secondary.light } }
            }
          ]
        })
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
      paper: '#1d1d1d', // Paper background color
      card: '#1d1d1d'
    },
    text: {
      primary: '#ffffff', // Primary text color
      secondary: '#9d9d9d' // Приглушённый серый — нейтральный, без оттенка
    },
    navigation: { main: '#1c1c1c', hover: NAVIGATION_HOVER, contrastText: '#ffffff' },
    outline: { strong: '#444', soft: '#444' },
    accent: { main: '#1976d2' },
    rating: { good: 'green', average: 'orange' },
    overlay: POSTER_OVERLAY
  }
})

export { darkTheme, lightTheme }
