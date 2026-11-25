import { SxProps } from '@mui/material'

export const appBarStyles: SxProps = {
  backgroundColor: 'navigation.main',
  backgroundImage: 'none',
  // Верхний отступ учитывает вырез/статус-бар iOS (viewport-fit=cover + black-translucent)
  padding: {
    xs: 'calc(15px + env(safe-area-inset-top)) 15px 15px',
    md: 'calc(15px + env(safe-area-inset-top)) 30px 15px',
    lg: 'calc(15px + env(safe-area-inset-top)) 30px 15px'
  },
  display: 'flex',
  gap: 2,
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 auto',
  width: '100%'
}

export const boxStyles: SxProps = {
  display: 'flex',
  gap: 2,
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 auto',
  width: '100%'
}

// На телефоне только логотип: с названием шапка не помещалась и «Настройки» уходили за правый край
export const titleStyles: SxProps = {
  display: { xs: 'none', sm: 'block' },
  fontWeight: 'bold',
  color: 'white'
}

export const buttonContainerStyles: SxProps = {
  display: { xs: 'none', sm: 'flex' },
  gap: 3,
  alignItems: 'center'
}

export const stackStyles: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  gap: 2
}
