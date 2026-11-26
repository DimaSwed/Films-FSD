import { SxProps, Theme } from '@mui/material'

import { clampLines } from '@/shared/lib'

const NOTCH_RADIUS = 9
// Узкая карточка: такой она бывает на самых маленьких телефонах (ширина экрана 320 px)
const NARROW = '@container (max-width: 270px)'

/**
 * Вырезает полукруги слева и справа, как у билета на линии отрыва. Маска состоит из двух половин,
 * и каждая вырезает свой угол.
 */
const notchMask = (edge: 'top' | 'bottom') => {
  const notch = (side: 'left' | 'right') =>
    `radial-gradient(circle ${NOTCH_RADIUS}px at ${side} ${edge}, transparent 97%, #000) ${side} / 51% 100% no-repeat`

  return `${notch('left')}, ${notch('right')}`
}

const pressable = {
  transition: 'transform 0.15s ease, background-color 0.2s ease',
  '&:active': { transform: 'scale(0.97)' },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    '&:active': { transform: 'none' }
  }
}

export const ticketStyles = {
  // Часть экрана занимает боковая панель, поэтому размеры подбираем по ширине карточки, а не экрана
  root: { containerType: 'inline-size' },

  // Верх билета. Текст здесь белый и в светлой, и в тёмной теме, поэтому кадр всегда затемнён.
  scene: {
    position: 'relative',
    display: 'flex',
    gap: 1.5,
    p: 1.5,
    color: 'common.white',
    bgcolor: 'grey.900',
    borderRadius: '14px 14px 0 0',
    overflow: 'hidden',
    // Кадр и затемнение лежат под содержимым (`zIndex: -1`). `isolation` не даёт им уйти ещё ниже,
    // под фон самого билета.
    isolation: 'isolate',
    mask: notchMask('bottom')
  },

  backdrop: {
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },

  shade: {
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    background: 'linear-gradient(100deg, rgba(0,0,0,0.9) 25%, rgba(0,0,0,0.6))'
  },

  // Не добавляйте сюда `position`: тогда нажать на постер, чтобы открыть фильм, не получится (см. `link`)
  poster: {
    flexShrink: 0,
    alignSelf: 'flex-start',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 104,
    aspectRatio: '2 / 3',
    borderRadius: '8px',
    overflow: 'hidden',
    bgcolor: 'grey.800',
    boxShadow: '0 0 0 1px rgba(255,255,255,0.16), 0 6px 16px rgba(0,0,0,0.5)',
    '& img': { width: '100%', height: '100%', objectFit: 'cover' },
    [NARROW]: { width: 88 }
  },

  info: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column'
  },

  // Отступ справа оставляет место для крестика
  title: {
    ...clampLines(3),
    overflowWrap: 'anywhere',
    pr: 4,
    fontWeight: 700,
    // Переносим по слогам только слова от 12 букв и оставляем на каждой строке не меньше 4 букв
    hyphens: 'auto',
    hyphenateLimitChars: '12 4 4',
    WebkitHyphenateLimitBefore: '4',
    WebkitHyphenateLimitAfter: '4',
    [NARROW]: { pr: 2.5, fontSize: '15px' }
  },

  // Ссылка на фильм — это название, но нажать можно на весь верх билета: невидимый слой `::after`
  // растянут на весь блок `scene`.
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&::after': { content: '""', position: 'absolute', inset: 0, borderRadius: 'inherit' },
    '&:active::after': { bgcolor: 'rgba(255,255,255,0.08)' },
    '&:focus-visible': { outline: 'none' },
    '&:focus-visible::after': {
      outline: '2px solid #fff',
      outlineOffset: '-5px',
      borderRadius: '14px'
    }
  },

  genre: { ...clampLines(2), overflowWrap: 'anywhere', mt: 0.75, opacity: 0.9 },

  facts: { display: 'flex', gap: 2, m: 0, mt: 'auto', pt: 1.25, [NARROW]: { gap: 1 } },

  fact: {
    '& + &': { pl: 2, borderLeft: '1px solid rgba(255,255,255,0.25)' },
    [NARROW]: { '& + &': { pl: 1 } }
  },

  factLabel: { opacity: 0.85 },

  factValue: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    m: 0,
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: 1.2,
    fontVariantNumeric: 'tabular-nums',
    [NARROW]: { fontSize: '18px' }
  },

  // Крестик: виден круг 32 px, но слой `::after` увеличивает область нажатия до 44 px
  remove: {
    ...pressable,
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    color: 'common.white',
    bgcolor: 'rgba(255,255,255,0.14)',
    '&::after': { content: '""', position: 'absolute', inset: -6 },
    '&:hover': { bgcolor: 'rgba(255,255,255,0.14)' },
    // На сенсорном экране стиль наведения остаётся после нажатия. Карточка удалится, на её место встанет
    // следующая, и её крестик окажется красным. Поэтому красим только там, где есть мышь.
    '@media (hover: hover)': { '&:hover': { bgcolor: 'error.main' } }
  },

  // Низ билета с кнопками. В светлой теме он кремовый, как бумага: на белой странице белый не выделялся бы.
  stub: {
    position: 'relative',
    px: 1.5,
    pt: 1.5,
    pb: 1.5,
    color: 'secondary.contrastText',
    bgcolor: (theme) =>
      theme.palette.mode === 'dark' ? 'action.hover' : theme.palette.background.default,
    borderRadius: '0 0 14px 14px',
    mask: notchMask('top'),
    // Пунктирная линия отрыва между полукругами
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: NOTCH_RADIUS + 6,
      right: NOTCH_RADIUS + 6,
      borderTop: '2px dashed',
      borderColor: (theme) =>
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.28)' : 'secondary.main'
    }
  },

  // Отступ сверху отделяет сервисы от линии отрыва
  providers: { pt: 0.5, mb: 1.5 },

  description: { pb: 1.5, lineHeight: 1.45, overflowWrap: 'anywhere' },

  buttons: {
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0, 1fr)',
    gap: 1,
    '& .MuiButton-root': {
      ...pressable,
      width: '100%',
      minWidth: 0,
      minHeight: 44,
      px: 1.5,
      borderRadius: '10px',
      boxShadow: 'none',
      fontSize: '15px',
      textTransform: 'none'
    },
    // На узкой карточке убираем иконку, чтобы поместился текст кнопок
    [NARROW]: {
      '& .MuiButton-root': { px: 1, fontSize: '14px' },
      '& .MuiButton-startIcon': { display: 'none' }
    }
  },

  toggle: { color: 'secondary.contrastText', '& .MuiButton-endIcon': { ml: 0.25 } },

  chevron: (isOpen: boolean): SxProps<Theme> => ({
    transition: 'transform 0.25s ease',
    transform: isOpen ? 'rotate(180deg)' : 'none',
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' }
  })
} satisfies Record<string, SxProps<Theme> | ((isOpen: boolean) => SxProps<Theme>)>
