import SearchIcon from '@mui/icons-material/Search'
import { Box, IconButton } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

import { announceToScreenReader } from '../lib'

import { QuickSearchPanel, ScreenReaderAnnouncer } from './quick-search'
import { searchButtonStyles } from './styles/search-movie-button.styles'

/** Кнопка-лупа в шапке: раскрывает быстрый поиск по названию. */
export const SearchMovieButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const wasOpenRef = useRef(false)

  // Панель размонтирована вместе с полем — возвращаем фокус на кнопку, иначе он теряется.
  useEffect(() => {
    if (wasOpenRef.current && !isOpen) buttonRef.current?.focus({ preventScroll: true })
    wasOpenRef.current = isOpen
  }, [isOpen])

  const open = () => {
    setIsOpen(true)
    announceToScreenReader('Поиск открыт')
  }

  const close = () => {
    setIsOpen(false)
    announceToScreenReader('Поиск закрыт')
  }

  return (
    <>
      <ScreenReaderAnnouncer />

      <Box sx={searchButtonStyles}>
        <IconButton
          ref={buttonRef}
          aria-label="Открыть поиск фильма"
          sx={{
            color: 'navigation.contrastText',
            visibility: isOpen ? 'hidden' : 'visible',
            '@media (hover: hover)': { '&:hover': { bgcolor: 'navigation.hover' } }
          }}
          onClick={open}
        >
          <SearchIcon />
        </IconButton>

        {isOpen && <QuickSearchPanel onClose={close} />}
      </Box>
    </>
  )
}
