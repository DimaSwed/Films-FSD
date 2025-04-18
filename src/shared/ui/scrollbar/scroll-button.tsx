import { useEffect, useState } from 'react'
import { Fab, useTheme } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

export const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const theme = useTheme()

  const handleScroll = () => {
    // Показываем кнопку, когда пользователь прокрутил больше 300px
    setIsVisible(window.scrollY > 300)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <Fab
      onClick={scrollToTop}
      sx={{
        position: 'fixed',
        bottom: { xs: 60, md: 100 },
        right: { xs: 60, md: 100 },
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          bgcolor: theme.palette.primary.dark
        },
        transition: 'opacity 0.3s ease',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      aria-label="Наверх"
    >
      <KeyboardArrowUpIcon />
    </Fab>
  )
}
