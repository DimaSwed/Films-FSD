import { useEffect, useState, useRef } from 'react'
import { Fab, useTheme } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

export const ScrollButton = () => {
  const [visible, setVisible] = useState(false)
  const mainRef = useRef<HTMLElement | null>(null)
  const theme = useTheme()

  useEffect(() => {
    mainRef.current = document.querySelector('main')
    if (!mainRef.current) return

    const handleScroll = () => {
      setVisible(mainRef.current!.scrollTop > 300)
    }

    mainRef.current.addEventListener('scroll', handleScroll)
    return () => {
      mainRef.current?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Fab
      onClick={() => mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
      sx={{
        position: 'fixed',
        bottom: 50,
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

// import { useEffect, useState, useRef } from 'react'
// import { Fab } from '@mui/material'
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

// export const ScrollButton = () => {
//   const [visible, setVisible] = useState(false)
//   const mainRef = useRef<HTMLElement | null>(null)

//   useEffect(() => {
//     mainRef.current = document.querySelector('main')
//     if (!mainRef.current) return

//     const handleScroll = () => {
//       setVisible(mainRef.current!.scrollTop > 300)
//     }

//     mainRef.current.addEventListener('scroll', handleScroll)
//     return () => {
//       mainRef.current?.removeEventListener('scroll', handleScroll)
//     }
//   }, [])

//   const scrollToTop = () => {
//     mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   return (
//     <Fab
//       onClick={scrollToTop}
//       sx={{
//         position: 'fixed',
//         bottom: 24,
//         right: 24,
//         opacity: visible ? 1 : 0,
//         transition: 'opacity 0.3s',
//         zIndex: 9999
//       }}
//     >
//       <KeyboardArrowUpIcon />
//     </Fab>
//   )
// }
