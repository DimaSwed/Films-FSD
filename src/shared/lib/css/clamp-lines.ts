/** Стили для `sx`: показать не больше `lines` строк текста, остальное заменить многоточием. */
export const clampLines = (lines: number) =>
  ({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: lines,
    overflow: 'hidden'
  }) as const
