import { KeyboardEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'

import { QUICK_SEARCH_DEBOUNCE_MS, QUICK_SEARCH_MIN_LENGTH } from '../config'
import { announceToScreenReader } from '../lib'

import { Movie } from './search.types'
import { useListNavigation } from './use-list-navigation'
import { useSearchHistory } from './use-search-history'
import { useSearchMovies } from './use-search-movies'

// Один и тот же массив между рендерами: от него зависит сброс активного элемента.
const NO_RESULTS: Movie[] = []

/** Запрос, который можно отправлять в TMDB; слишком короткий — пустая строка (поиск выключен). */
const toSearchQuery = (term: string) => {
  const trimmed = term.trim()
  return trimmed.length >= QUICK_SEARCH_MIN_LENGTH ? trimmed : ''
}

interface IUseQuickSearchOptions {
  /** Закрыть поиск после выбора фильма. */
  onClose: () => void
}

/**
 * Быстрый поиск в шапке: запрос, результаты, история и клавиатура.
 * Пока поле пусто — показываем историю; с `QUICK_SEARCH_MIN_LENGTH` символов — результаты: после
 * паузы в наборе, по Enter или сразу при выборе запроса из истории.
 */
export const useQuickSearch = ({ onClose }: IUseQuickSearchOptions) => {
  const navigate = useNavigate()
  const { history, addToHistory } = useSearchHistory()

  const [term, setTerm] = useState('')
  // Запрос, к которому относятся `results`; при вводе отстаёт от `term` на время debounce.
  const [activeQuery, setActiveQuery] = useState('')
  const setActiveQueryLater = useDebouncedCallback(setActiveQuery, QUICK_SEARCH_DEBOUNCE_MS)

  const setActiveQueryNow = (query: string) => {
    setActiveQueryLater.cancel()
    setActiveQuery(query)
  }

  const { data, isLoading } = useSearchMovies(activeQuery)

  const typedQuery = toSearchQuery(term)
  const isSettled = typedQuery === activeQuery
  const results = data ?? NO_RESULTS
  const isHistoryShown = term.trim() === '' && history.length > 0
  // Только успешный пустой ответ: ошибка сети — не «ничего не найдено».
  const isNotFound = isSettled && data?.length === 0

  const { activeIndex, moveDown, moveUp } = useListNavigation(isHistoryShown ? history : results)

  const changeTerm = (value: string) => {
    setTerm(value)

    const query = toSearchQuery(value)
    if (query) setActiveQueryLater(query)
    else setActiveQueryNow('')
  }

  const selectMovie = (movie: Movie) => {
    addToHistory(term)
    navigate(`/movie/${movie.id}`)
    onClose()
    announceToScreenReader(`Выбран фильм: ${movie.title}`)
  }

  const selectHistoryItem = (item: string) => {
    setTerm(item)
    setActiveQueryNow(toSearchQuery(item))
    announceToScreenReader(`Выбран запрос из истории: ${item}`)
  }

  const handleEnter = () => {
    if (activeIndex >= 0) {
      if (isHistoryShown) selectHistoryItem(history[activeIndex])
      else selectMovie(results[activeIndex])
      return
    }

    if (!typedQuery) return

    // Показанные результаты могут относиться к прошлому запросу — сначала ищем введённый.
    if (isSettled && results.length > 0) {
      selectMovie(results[0])
      return
    }

    addToHistory(term)
    if (!isSettled) setActiveQueryNow(typedQuery)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        moveDown()
        break
      case 'ArrowUp':
        moveUp()
        break
      case 'Enter':
        handleEnter()
        break
      default:
        return
    }
    event.preventDefault()
  }

  return {
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
  }
}
