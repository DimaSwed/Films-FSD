import { RefObject, useLayoutEffect, useRef } from 'react'
import { useLocation, useMatches, useNavigationType } from 'react-router-dom'

/**
 * Метка для маршрута (поле `handle` в `router.tsx`). Если она есть, то при возврате «назад»
 * страница откроется там, где её оставили, а не сверху.
 */
export const KEEPS_SCROLL = { keepsScroll: true }

// Если данные загружаются заново, страница сначала короткая и прокрутить её до нужного места нельзя.
// Ждём, пока она вырастет, но не дольше этого времени.
const RESTORE_TIMEOUT_MS = 3000
// Если пользователь начал что-то делать сам, перестаём двигать страницу за него
const USER_SCROLL_EVENTS = ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const

// Где остановилась прокрутка. Ключ — запись в истории браузера, а не адрес: один адрес можно открыть
// несколько раз, и новое открытие должно начинаться сверху.
const positions = new Map<string, number>()

/**
 * Прокручивает страницу до `target`. Если она пока слишком короткая, пробует снова на каждом кадре.
 * Останавливается, когда место достигнуто, вышло время или пользователь вмешался сам,
 * и тогда вызывает `onFinish`. Возвращает функцию отмены (она `onFinish` не вызывает).
 */
const scrollWhenReady = (element: HTMLElement, target: number, onFinish: () => void) => {
  const deadline = performance.now() + RESTORE_TIMEOUT_MS
  let frame = 0

  const cancel = () => {
    cancelAnimationFrame(frame)
    USER_SCROLL_EVENTS.forEach((event) => window.removeEventListener(event, finish))
  }

  const finish = () => {
    cancel()
    onFinish()
  }

  const tryScroll = () => {
    element.scrollTo(0, target)

    const isReached = element.scrollHeight - element.clientHeight >= target
    if (isReached || performance.now() > deadline) finish()
    else frame = requestAnimationFrame(tryScroll)
  }

  USER_SCROLL_EVENTS.forEach((event) => window.addEventListener(event, finish, { passive: true }))
  tryScroll()

  return cancel
}

/**
 * Управляет прокруткой `<main>` при переходах между страницами:
 * - новая страница открывается сверху;
 * - возврат «назад» или «вперёд» на маршрут с меткой `KEEPS_SCROLL` — на прежнем месте;
 * - если поменялись только параметры адреса (`?…`), прокрутка остаётся как есть.
 */
export const useScrollRestoration = (ref: RefObject<HTMLElement | null>) => {
  const { key, pathname } = useLocation()
  const navigationType = useNavigationType()
  const keepsScroll = useMatches().some(({ handle }) => handle === KEEPS_SCROLL)
  const previousPathname = useRef<string | null>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    // `POP` — переход кнопками браузера «назад» и «вперёд»
    const saved = keepsScroll && navigationType === 'POP' ? positions.get(key) : undefined
    const isSamePage = previousPathname.current === pathname
    previousPathname.current = pathname

    const savePosition = () => positions.set(key, element.scrollTop)
    // Запоминать место начинаем только после восстановления. Пока страница короткая, прокрутка
    // меньше нужной, и она затёрла бы сохранённое значение.
    const startSaving = () => element.addEventListener('scroll', savePosition, { passive: true })
    let cancelRestoring: (() => void) | undefined

    if (isSamePage && saved === undefined) {
      savePosition()
      startSaving()
    } else {
      cancelRestoring = scrollWhenReady(element, saved ?? 0, startSaving)
    }

    return () => {
      cancelRestoring?.()
      element.removeEventListener('scroll', savePosition)
    }
  }, [key, pathname, navigationType, keepsScroll, ref])
}
