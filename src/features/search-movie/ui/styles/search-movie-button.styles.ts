import { SxProps } from '@mui/material'

export const searchButtonStyles: SxProps = {
  position: 'relative',
  width: '50px'
}

export const searchBoxStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'background.paper',
  borderRadius: 1,
  width: '320px',
  height: 'fit-content',
  zIndex: 1000,
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  position: 'absolute',
  right: 0,
  top: 0
}

export const textFieldStyles: SxProps = {
  width: '100%',
  '& .MuiInputBase-root': {
    color: 'text.primary'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'primary.contrastText'
    },
    '&:hover fieldset': {
      borderColor: 'primary.contrastText'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'primary.contrastText'
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
  backgroundColor: 'rgba(25, 118, 210, 0.08)',
  outline: '2px solid #1976d2'
} satisfies SxProps
