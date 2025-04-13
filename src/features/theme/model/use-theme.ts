import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { ThemeType } from './theme-context'

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeType>('light')

  useEffect(() => {
    const storedTheme = Cookies.get('theme') as ThemeType | undefined
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    Cookies.set('theme', newTheme, { sameSite: 'None', secure: true })
  }

  return { theme, toggleTheme }
}
