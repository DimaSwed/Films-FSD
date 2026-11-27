import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Box, IconButton, Typography } from '@mui/material'
import { FC, MouseEvent, ReactNode, useId } from 'react'

import { useScrollEdges } from './use-scroll-edges'

interface IScrollRowProps {
  title: string
  /** Элементы списка — `<li>` (например, `<Box component="li">`). */
  children: ReactNode
  /** Действие справа от заголовка, например ссылка «Смотреть все». */
  action?: ReactNode
}

/** Клик не забирает фокус: на краю ряда кнопка отключается, и фокус бы потерялся. */
const keepFocus = (event: MouseEvent) => event.preventDefault()

/**
 * Секция с горизонтальным рядом карточек: свайп на телефоне, стрелки на устройствах с мышью,
 * стрелки клавиатуры — когда ряд в фокусе.
 */
export const ScrollRow: FC<IScrollRowProps> = ({ title, children, action }) => {
  const titleId = useId()
  const { ref, scroll, canScrollLeft, canScrollRight } = useScrollEdges()
  const isScrollable = canScrollLeft || canScrollRight

  return (
    <Box component="section" aria-labelledby={titleId}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          mb: 1
        }}
      >
        <Typography
          id={titleId}
          variant="h4"
          component="h2"
          sx={{ minWidth: 0, textWrap: 'balance' }}
        >
          {title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
          {action}
          {isScrollable && (
            // Только для мыши: с клавиатуры листается сам ряд, поэтому кнопок нет в обходе по Tab
            <Box sx={{ display: 'none', '@media (hover: hover)': { display: 'flex' } }}>
              <IconButton
                tabIndex={-1}
                color="inherit"
                aria-label={`${title}: назад`}
                disabled={!canScrollLeft}
                onMouseDown={keepFocus}
                onClick={() => scroll(-1)}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                tabIndex={-1}
                color="inherit"
                aria-label={`${title}: вперёд`}
                disabled={!canScrollRight}
                onMouseDown={keepFocus}
                onClick={() => scroll(1)}
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>

      <Box
        ref={ref}
        role="group"
        aria-labelledby={titleId}
        tabIndex={isScrollable ? 0 : undefined}
        sx={{
          overflowX: 'auto',
          overscrollBehaviorX: 'contain',
          scrollSnapType: 'x proximity',
          scrollbarWidth: 'thin',
          // Место для обводки фокуса и увеличения карточки при наведении; mx возвращает ряд под заголовок
          py: 1,
          mx: -1
        }}
      >
        <Box
          component="ul"
          sx={{
            display: 'flex',
            gap: 2,
            width: 'max-content',
            listStyle: 'none',
            m: 0,
            px: 1,
            '& > li': { scrollSnapAlign: 'start', scrollMarginLeft: '8px' }
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
