import { useState, KeyboardEvent, ChangeEvent, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, IconButton, InputAdornment, TextField, Fade } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useDebounce } from 'use-debounce'

import { useSearchMovies } from '@/features/search-movie'
import { getSearchHistory, setSearchHistory } from '@/features/search-movie'
import { announceToScreenReader } from '@/features/search-movie'
import { Movie } from '@/features/search-movie/'
import {
  searchButtonStyles,
  searchBoxStyles,
  textFieldStyles,
  searchResultStyles,
  historyStyles,
  movieItemStyles,
  emptyResultStyles
} from '@/features/search-movie/ui/styles/search-movie-button.styles'

export const SearchMovieButton = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const [showHistory, setShowHistory] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const resultItemsRef = useRef<(HTMLDivElement | null)[]>([])

  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [history, setHistory] = useState<string[]>([])
  const navigate = useNavigate()
  const { data, isLoading } = useSearchMovies(debouncedSearchTerm)
  const searchResultsId = 'search-results-list'
  const historyListId = 'search-history-list'

  // Сбрасываем активный индекс при изменении результатов
  useEffect(() => {
    setActiveIndex(-1)
  }, [searchResults, showHistory])

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    const storedHistory = getSearchHistory()
    setHistory(storedHistory)
  }, [])

  useEffect(() => {
    setSearchHistory(history)
  }, [history])

  useEffect(() => {
    if (debouncedSearchTerm.length >= 3 && data?.docs) {
      setSearchResults(data.docs)
      setShowHistory(false)
    } else if (debouncedSearchTerm.length === 0 && history.length > 0) {
      setSearchResults([])
      setShowHistory(true)
    } else {
      setSearchResults([])
      setShowHistory(false)
    }
  }, [debouncedSearchTerm, data, history])

  // Обработка фокуса на выбранном элементе
  useEffect(() => {
    if (activeIndex >= 0 && resultItemsRef.current[activeIndex]) {
      resultItemsRef.current[activeIndex]?.focus()
    }
  }, [activeIndex])

  const handleSearchClick = () => {
    setSearchOpen(true)
    // Объявляем пользователю, что поиск открыт
    announceToScreenReader('Поиск открыт')
  }

  const handleCloseSearch = () => {
    setSearchOpen(false)
    setSearchTerm('')
    setSearchResults([])
    setActiveIndex(-1)
    // Объявляем пользователю, что поиск закрыт
    announceToScreenReader('Поиск закрыт')
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleMovieSelect = (id: number, title: string) => {
    addToHistory(searchTerm)
    navigate(`/movie/${id}`)
    handleCloseSearch()
    // Объявляем пользователю, что выбран фильм
    announceToScreenReader(`Выбран фильм: ${title}`)
  }

  const addToHistory = (query: string) => {
    if (query.trim().length < 3) return
    const updated = Array.from(new Set([query, ...history])).slice(0, 10)
    setHistory(updated)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const items = showHistory ? history : searchResults
    const maxIndex = items.length - 1

    switch (event.key) {
      case 'Enter':
        if (activeIndex >= 0 && activeIndex <= maxIndex) {
          // Если выбран элемент из списка
          if (showHistory) {
            setSearchTerm(history[activeIndex])
          } else {
            handleMovieSelect(searchResults[activeIndex].id, searchResults[activeIndex].title)
          }
        } else if (searchTerm.trim().length >= 3) {
          // Если нет выбранного элемента, но введен поисковый запрос
          addToHistory(searchTerm)
          if (searchResults.length > 0) {
            handleMovieSelect(searchResults[0].id, searchResults[0].title)
          }
        }
        event.preventDefault()
        break
      case 'Escape':
        handleCloseSearch()
        event.preventDefault()
        break
      case 'ArrowDown':
        setActiveIndex((prev) => Math.min(prev + 1, maxIndex))
        event.preventDefault()
        break
      case 'ArrowUp':
        setActiveIndex((prev) => Math.max(prev - 1, -1))
        event.preventDefault()
        break
      case 'Tab':
        // Обрабатываем Tab для перемещения по списку только если список открыт
        if ((searchResults.length > 0 || (showHistory && history.length > 0)) && !event.shiftKey) {
          setActiveIndex((prev) => (prev < maxIndex ? prev + 1 : -1))
          event.preventDefault()
        } else if (
          (searchResults.length > 0 || (showHistory && history.length > 0)) &&
          event.shiftKey
        ) {
          setActiveIndex((prev) => (prev > -1 ? prev - 1 : maxIndex))
          event.preventDefault()
        }
        break
      default:
        break
    }
  }

  const handleHistoryItemClick = (item: string) => {
    setSearchTerm(item)
    inputRef.current?.focus()
    announceToScreenReader(`Выбран запрос из истории: ${item}`)

    if (item.length >= 3) {
      setShowHistory(false)
    }
  }

  const isItemActive = (index: number) => activeIndex === index

  return (
    <>
      {/* ARIA live region для объявлений скринридеру */}
      <div
        id="screen-reader-announcer"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden'
        }}
      ></div>

      <Box sx={searchButtonStyles}>
        <IconButton
          aria-label="Открыть поиск фильма"
          sx={{ color: 'primary.contrastText', visibility: searchOpen ? 'hidden' : 'visible' }}
          onClick={handleSearchClick}
        >
          <SearchIcon />
        </IconButton>

        {searchOpen && (
          <Fade in={searchOpen}>
            <Box component="div" sx={searchBoxStyles} role="search" aria-label="Поиск фильмов">
              <TextField
                variant="outlined"
                inputRef={inputRef}
                placeholder="Введите название фильма"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                sx={textFieldStyles}
                aria-label="Поиск фильма"
                aria-autocomplete="list"
                aria-controls={
                  searchResults.length > 0
                    ? searchResultsId
                    : showHistory
                      ? historyListId
                      : undefined
                }
                aria-activedescendant={activeIndex >= 0 ? `option-${activeIndex}` : undefined}
                aria-describedby="search-description"
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'text.primary' }} aria-hidden="true" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="Закрыть поиск" onClick={handleCloseSearch}>
                        <CloseIcon sx={{ color: 'text.primary' }} aria-hidden="true" />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <span id="search-description" className="sr-only" style={{ display: 'none' }}>
                Введите не менее 3 символов для поиска. Используйте стрелки вверх и вниз для
                навигации по результатам.
              </span>

              {isLoading && (
                <Box role="status" aria-live="polite" sx={searchResultStyles}>
                  Загрузка результатов...
                </Box>
              )}

              {searchResults.length > 0 && (
                <Box
                  ref={resultsRef}
                  role="listbox"
                  id={searchResultsId}
                  aria-label="Результаты поиска"
                  sx={searchResultStyles}
                  tabIndex={-1}
                >
                  {searchResults.map((movie, index) => (
                    <Box
                      key={movie.id}
                      ref={(el: HTMLDivElement | null) => {
                        resultItemsRef.current[index] = el
                      }}
                      role="option"
                      id={`option-${index}`}
                      aria-selected={isItemActive(index)}
                      tabIndex={isItemActive(index) ? 0 : -1}
                      sx={{
                        ...movieItemStyles,
                        backgroundColor: isItemActive(index)
                          ? 'rgba(25, 118, 210, 0.08)'
                          : 'transparent',
                        outline: isItemActive(index) ? '2px solid #1976d2' : 'none'
                      }}
                      onClick={() => handleMovieSelect(movie.id, movie.title)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleMovieSelect(movie.id, movie.title)
                          e.preventDefault()
                        }
                      }}
                    >
                      &quot;{movie.title}&quot; {movie.year}
                    </Box>
                  ))}
                </Box>
              )}

              {searchResults.length === 0 && debouncedSearchTerm.length >= 3 && (
                <Box role="status" aria-live="polite" sx={emptyResultStyles}>
                  Ничего не найдено
                </Box>
              )}

              {showHistory && history.length > 0 && (
                <Box
                  role="listbox"
                  id={historyListId}
                  aria-label="История поиска"
                  sx={historyStyles}
                  tabIndex={-1}
                >
                  {history.map((item, index) => (
                    <Box
                      key={index}
                      ref={(el: HTMLDivElement | null) => {
                        resultItemsRef.current[index] = el
                      }}
                      role="option"
                      id={`option-${index}`}
                      aria-selected={isItemActive(index)}
                      tabIndex={isItemActive(index) ? 0 : -1}
                      sx={{
                        ...movieItemStyles,
                        backgroundColor: isItemActive(index)
                          ? 'rgba(25, 118, 210, 0.08)'
                          : 'transparent',
                        outline: isItemActive(index) ? '2px solid #1976d2' : 'none'
                      }}
                      onClick={() => handleHistoryItemClick(item)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleHistoryItemClick(item)
                          e.preventDefault()
                        }
                      }}
                    >
                      {item}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Fade>
        )}
      </Box>
    </>
  )
}
