import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Fade, IconButton, InputAdornment, TextField } from '@mui/material'
import { KeyboardEvent, useEffect, useId, useRef } from 'react'

import { QUICK_SEARCH_MIN_LENGTH } from '../../config'
import { useQuickSearch } from '../../model'
import {
  emptyResultStyles,
  historyStyles,
  searchBoxStyles,
  searchResultStyles,
  textFieldStyles
} from '../styles/search-movie-button.styles'

import { getSearchOptionId } from './search-option-id'
import { SearchOptionList } from './search-option-list'

interface IQuickSearchPanelProps {
  onClose: () => void
}

/**
 * Раскрытое поле быстрого поиска с результатами и историей. Монтируется только на время поиска,
 * поэтому закрытие само сбрасывает введённый запрос и выбранный элемент.
 */
export const QuickSearchPanel = ({ onClose }: IQuickSearchPanelProps) => {
  const {
    term,
    changeTerm,
    results,
    history,
    isHistoryShown,
    isLoading,
    isNotFound,
    activeIndex,
    selectMovie,
    selectHistoryItem,
    handleKeyDown
  } = useQuickSearch({ onClose })

  // Поле открывается по действию пользователя — переносим в него фокус.
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Escape закрывает поиск из любого места панели, а не только из поля.
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') return
    event.preventDefault()
    onClose()
  }

  const pickHistoryItem = (index: number) => {
    selectHistoryItem(history[index])
    inputRef.current?.focus()
  }

  const baseId = useId()
  const resultsId = `${baseId}-results`
  const historyId = `${baseId}-history`
  const descriptionId = `${baseId}-description`

  const visibleListId = isHistoryShown ? historyId : results.length > 0 ? resultsId : undefined

  return (
    <Fade in>
      <Box sx={searchBoxStyles} role="search" aria-label="Поиск фильмов" onKeyDown={handleEscape}>
        <TextField
          inputRef={inputRef}
          variant="outlined"
          placeholder="Введите название фильма"
          value={term}
          onChange={(event) => changeTerm(event.target.value)}
          sx={textFieldStyles}
          autoComplete="off"
          slotProps={{
            htmlInput: {
              role: 'combobox',
              // На самом input: у TextField onKeyDown ловит и нажатия на кнопке «Закрыть поиск».
              onKeyDown: handleKeyDown,
              'aria-label': 'Поиск фильма',
              'aria-autocomplete': 'list',
              'aria-expanded': !!visibleListId,
              'aria-controls': visibleListId,
              'aria-activedescendant':
                visibleListId && activeIndex >= 0
                  ? getSearchOptionId(visibleListId, activeIndex)
                  : undefined,
              'aria-describedby': descriptionId
            },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.primary' }} aria-hidden="true" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="Закрыть поиск" onClick={onClose}>
                    <CloseIcon sx={{ color: 'text.primary' }} aria-hidden="true" />
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
        />

        <span id={descriptionId} style={{ display: 'none' }}>
          Введите не менее {QUICK_SEARCH_MIN_LENGTH} символов для поиска. Используйте стрелки вверх
          и вниз для навигации по результатам.
        </span>

        {isLoading && (
          <Box role="status" aria-live="polite" sx={searchResultStyles}>
            Загрузка результатов...
          </Box>
        )}

        {results.length > 0 && (
          <SearchOptionList
            id={resultsId}
            label="Результаты поиска"
            options={results.map((movie) => ({
              key: movie.id,
              // У анонсированных фильмов даты нет: `year` равен 0.
              label: movie.year ? `"${movie.title}" ${movie.year}` : `"${movie.title}"`
            }))}
            activeIndex={activeIndex}
            onSelect={(index) => selectMovie(results[index])}
            sx={searchResultStyles}
          />
        )}

        {isNotFound && (
          <Box role="status" aria-live="polite" sx={emptyResultStyles}>
            Ничего не найдено
          </Box>
        )}

        {isHistoryShown && (
          <SearchOptionList
            id={historyId}
            label="История поиска"
            options={history.map((item) => ({ key: item, label: item }))}
            activeIndex={activeIndex}
            onSelect={pickHistoryItem}
            sx={historyStyles}
          />
        )}
      </Box>
    </Fade>
  )
}
