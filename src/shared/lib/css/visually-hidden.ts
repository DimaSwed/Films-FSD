import type { CSSProperties } from 'react'

/**
 * Прячет элемент с экрана, но оставляет его скринридеру. Обычные CSS-свойства, поэтому подходит
 * и для `style`, и для `sx`.
 */
export const visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0
} as const satisfies CSSProperties
