import { SxProps } from '@mui/material'

export const appBarStyles: SxProps = {
  backgroundColor: 'primary.main',
  backgroundImage: 'none',
  padding: { xs: '15px', md: '15px 30px', lg: '15px 30px' },
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
