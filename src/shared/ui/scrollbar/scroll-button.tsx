import { useEffect, useState } from 'react'
import { Fab, useTheme } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

export const ScrollButton = () => {
  const [visible, setVisible] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.pageYOffset > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Fab
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      sx={{
        position: 'fixed',
        bottom: { xs: 100, md: 50 },
        right: 50,
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          bgcolor: theme.palette.primary.dark
        },
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0)',
        pointerEvents: visible ? 'auto' : 'none',
        zIndex: 9999999
      }}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  )
}
