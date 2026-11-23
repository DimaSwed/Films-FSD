import { useCallback, useState } from 'react'

import { QUICK_SEARCH_MIN_LENGTH, SEARCH_HISTORY_LIMIT } from '../config'
import { getSearchHistory, setSearchHistory } from '../lib'

/** История запросов быстрого поиска: последние уникальные, новые первыми, хранится в `localStorage`. */
export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>(getSearchHistory)

  const addToHistory = useCallback(
    (query: string) => {
      const term = query.trim()
      if (term.length < QUICK_SEARCH_MIN_LENGTH) return

      const next = [term, ...history.filter((item) => item !== term)].slice(0, SEARCH_HISTORY_LIMIT)
      setHistory(next)
      // Пишем сразу, а не эффектом: после выбора фильма поиск закрывается и эффект не успел бы сработать.
      setSearchHistory(next)
    },
    [history]
  )

  return { history, addToHistory }
}
