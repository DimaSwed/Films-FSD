import { useEffect, useState } from 'react'
import { Fab, useTheme } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

export const ScrollButton = () => {
  const [atBottom, setAtBottom] = useState(false)
  const theme = useTheme()

  const handleScroll = () => {
    const scrollTop = window.scrollY
    const windowHeight = window.innerHeight
    const docHeight = document.documentElement.scrollHeight
    setAtBottom(scrollTop + windowHeight >= docHeight - 100)
  }

  const handleClick = () => {
    if (atBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    handleScroll() // запуск при монтировании
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Fab
      onClick={handleClick}
      sx={{
        position: 'fixed',
        bottom: { xs: 60, md: 100 },
        right: { xs: 60, md: 100 },
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          bgcolor: theme.palette.primary.dark
        }
      }}
    >
      {atBottom ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </Fab>
  )
}
