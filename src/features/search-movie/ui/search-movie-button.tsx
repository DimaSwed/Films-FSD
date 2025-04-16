import { useState, KeyboardEvent, ChangeEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, IconButton, InputAdornment, TextField, Fade } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useDebounce } from 'use-debounce'

import { useSearchMovies } from '@/features/search-movie/hooks/use-search-movies'
import { getSearchHistory, setSearchHistory } from '@/features/search-movie/lib/persist-history'
import { Movie } from '@/features/search-movie/types/search.types'
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

  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [history, setHistory] = useState<string[]>([])
  const navigate = useNavigate()
  const { data } = useSearchMovies(debouncedSearchTerm)

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
    } else {
      setSearchResults([])
    }
  }, [debouncedSearchTerm, data])

  const handleSearchClick = () => {
    setSearchOpen(true)
  }

  const handleCloseSearch = () => {
    setSearchOpen(false)
    setSearchTerm('')
    setSearchResults([])
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleMovieSelect = (id: number) => {
    addToHistory(searchTerm)
    navigate(`/movie/${id}`)
    handleCloseSearch()
  }

  const addToHistory = (query: string) => {
    const updated = Array.from(new Set([query, ...history])).slice(0, 10)
    setHistory(updated)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addToHistory(searchTerm)
      setSearchTerm('')
    }
  }

  return (
    <Box sx={searchButtonStyles}>
      <IconButton
        sx={{ color: 'primary.contrastText', visibility: searchOpen ? 'hidden' : 'visible' }}
        onClick={handleSearchClick}
      >
        <SearchIcon />
      </IconButton>
      {searchOpen && (
        <Fade in={searchOpen}>
          <Box component="div" sx={searchBoxStyles}>
            <TextField
              variant="outlined"
              placeholder="Введите название фильма"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              sx={textFieldStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.primary' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleCloseSearch}>
                      <CloseIcon sx={{ color: 'text.primary' }} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Box sx={searchResultStyles}>
              {searchResults.length > 0 ? (
                searchResults.map((movie) => (
                  <Box
                    key={movie.id}
                    sx={movieItemStyles}
                    onClick={() => handleMovieSelect(movie.id)}
                  >
                    &quot;{movie.title}&quot; {movie.year}
                  </Box>
                ))
              ) : (
                <Box sx={emptyResultStyles}>Ничего не найдено</Box>
              )}
            </Box>

            <Box sx={historyStyles}>
              {history.map((item, index) => (
                <Box key={index} sx={movieItemStyles} onClick={() => setSearchTerm(item)}>
                  {item}
                </Box>
              ))}
            </Box>
          </Box>
        </Fade>
      )}
    </Box>
  )
}
