import { SetStateAction, useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const storage = new Map<string, unknown>()

/**
 * Как `useState`, но при возврате «назад» на страницу значение остаётся прежним.
 *
 * Значение привязано к записи в истории браузера: если открыть ту же страницу заново (например, из
 * меню), она начнёт с `initialValue`. После перезагрузки вкладки всё забывается.
 *
 * `name` отличает это значение от других на той же странице.
 */
export const useHistoryState = <T>(name: string, initialValue: T) => {
  const { key } = useLocation()
  const storageKey = `${key}:${name}`

  const restore = (fallback: T) => ({
    storageKey,
    value: storage.has(storageKey) ? (storage.get(storageKey) as T) : fallback
  })

  const [state, setState] = useState(() => restore(initialValue))

  // Запись в истории может смениться, а страница — остаться той же: например, по ней ещё раз нажали
  // в меню или вернулись сразу на два шага назад. Если для этой записи есть сохранённое значение, берём
  // его, а если нет — оставляем текущее.
  if (state.storageKey !== storageKey) setState(restore(state.value))

  useEffect(() => {
    storage.set(state.storageKey, state.value)
  }, [state])

  const setValue = useCallback(
    (next: SetStateAction<T>) =>
      setState((prev) => ({
        ...prev,
        value: typeof next === 'function' ? (next as (value: T) => T)(prev.value) : next
      })),
    []
  )

  return [state.value, setValue] as const
}
