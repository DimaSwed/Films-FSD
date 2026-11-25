import { alpha, SxProps, Theme } from '@mui/material'

export const searchButtonStyles: SxProps = {
  // На телефоне панель поиска отсчитывается от шапки (AppBar), а не от кнопки: см. searchBoxStyles
  position: { xs: 'static', sm: 'relative' },
  width: '50px'
}

export const searchBoxStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'background.paper',
  borderRadius: 1,
  width: { xs: 'auto', sm: '320px' },
  height: 'fit-content',
  zIndex: 1000,
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  position: 'absolute',
  // Телефон: во всю ширину шапки с её полями — 320 px от кнопки вылезали бы за левый край экрана
  left: { xs: '15px', sm: 'auto' },
  right: { xs: '15px', sm: 0 },
  top: { xs: 'calc(12px + env(safe-area-inset-top))', sm: 0 }
}

export const textFieldStyles: SxProps = {
  width: '100%',
  '& .MuiInputBase-root': {
    color: 'text.primary'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'outline.strong'
    },
    '&:hover fieldset': {
      borderColor: 'text.primary'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'text.primary'
    }
  }
}

export const searchResultStyles: SxProps = {
  width: '100%',
  maxHeight: '300px',
  overflowY: 'auto'
}

export const historyStyles: SxProps = {
  width: '100%',
  maxHeight: '200px',
  overflowY: 'auto'
}

export const movieItemStyles = {
  color: 'text.primary',
  padding: 1,
  cursor: 'pointer',
  textAlign: 'center',
  fontWeight: '500',
  textTransform: 'capitalize',
  '&:hover': { backgroundColor: 'grey.200', color: 'black' }
} satisfies SxProps

export const emptyResultStyles: SxProps = {
  padding: 1,
  color: 'text.primary',
  textAlign: 'center'
}

export const activeOptionStyles = {
  backgroundColor: ({ palette }: Theme) => alpha(palette.accent.main, 0.08),
  outline: ({ palette }: Theme) => `2px solid ${palette.accent.main}`
} satisfies SxProps<Theme>
