import { alpha, keyframes, SxProps, Theme } from '@mui/material'

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(1.03); }
  to { opacity: 1; transform: none; }
`

const riseIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: none; }
`

const MOTION = '@media (prefers-reduced-motion: no-preference)'

/** Баннер тёмный в обеих темах, как верх страниц фильма и человека: текст поверх кадра белый. */
export const homeHeroStyles = {
  root: {
    position: 'relative',
    isolation: 'isolate',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-end',
    minHeight: { xs: 540, sm: 420, md: 440, xl: 520 },
    borderRadius: { xs: '16px', md: '24px' },
    bgcolor: 'grey.900',
    color: 'common.white',
    // Свайп по горизонтали — смена фильма, по вертикали — обычная прокрутка страницы
    touchAction: 'pan-y'
  },
  backdrop: {
    position: 'absolute',
    inset: 0,
    zIndex: -2,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    // На телефоне кадр виден над текстом: держим в кадре верхнюю часть, где обычно лица
    objectPosition: { xs: 'center 20%', md: 'center 30%' },
    opacity: 0,
    '&[data-loaded="true"]': {
      opacity: 1,
      [MOTION]: { animation: `${fadeIn} 600ms ease-out both` }
    }
  },
  // Затемнение: снизу на телефоне (текст внизу), слева на широком экране (текст слева)
  shade: {
    position: 'absolute',
    inset: 0,
    zIndex: -1,
    background: {
      xs: 'linear-gradient(to top, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.82) 42%, rgba(10,10,10,0.15) 78%, rgba(10,10,10,0.05) 100%)',
      md: 'linear-gradient(90deg, rgba(10,10,10,0.94) 0%, rgba(10,10,10,0.78) 38%, rgba(10,10,10,0.2) 70%, rgba(10,10,10,0) 100%), linear-gradient(to top, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0) 40%)'
    }
  },
  content: {
    position: 'relative',
    width: '100%',
    // С `lg` справа внизу миниатюры (до ~350 px): текст до них не доходит
    maxWidth: { md: 640, lg: 'min(640px, calc(100% - 400px))' },
    p: { xs: 2.5, sm: 4, md: 5 },
    [MOTION]: { animation: `${riseIn} 450ms ease-out both` }
  },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    mb: 1.5,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: '0.02em',
    color: 'rgba(255,255,255,0.8)'
  },
  eyebrowDot: (theme: Theme) => {
    // Ореол — тот же цвет, что у точки: берётся из палитры, а не дублируется числом
    const color =
      theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.accent.main
    return {
      width: 8,
      height: 8,
      borderRadius: '50%',
      bgcolor: color,
      boxShadow: `0 0 0 4px ${alpha(color, 0.25)}`
    }
  },
  title: {
    // Своя шкала вместо h1 темы: на `lg` колонка текста узкая из-за миниатюр
    fontSize: { xs: 32, sm: 42, md: 48, lg: 44, xl: 56 },
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.05,
    textWrap: 'balance',
    overflowWrap: 'anywhere'
  },
  meta: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: 1.5,
    rowGap: 0.5,
    mt: 1.5,
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    fontVariantNumeric: 'tabular-nums'
  },
  rating: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0.5,
    fontWeight: 700,
    color: 'common.white'
  },
  description: {
    mt: 2,
    maxWidth: '60ch',
    color: 'rgba(255,255,255,0.82)',
    lineHeight: 1.5
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1.5,
    mt: 3,
    '& .MuiButton-root': {
      minHeight: 44,
      px: 2.5,
      borderRadius: '999px',
      textTransform: 'none',
      fontWeight: 500,
      fontSize: 15
    },
    // Кнопка трейлера из entities — контурная, на тёмном кадре делаем её «стеклянной»
    '& .MuiButton-outlined': {
      borderColor: 'rgba(255,255,255,0.4)',
      bgcolor: 'rgba(255,255,255,0.08)',
      backdropFilter: 'blur(6px)',
      '&:hover': { borderColor: 'common.white', bgcolor: 'rgba(255,255,255,0.16)' }
    }
  },
  primaryButton: {
    bgcolor: 'common.white',
    color: 'grey.900',
    boxShadow: 'none',
    '&:hover': { bgcolor: 'grey.200', boxShadow: 'none' },
    '&:active': { transform: 'translateY(1px)' }
  },
  // До `lg`: точки-индикаторы под кнопками
  dots: {
    display: { xs: 'flex', lg: 'none' },
    gap: 0.5,
    mt: 2.5,
    ml: -1
  },
  dot: {
    width: 32,
    height: 32,
    minWidth: 0,
    p: 0,
    border: 0,
    bgcolor: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    '&::before': {
      content: '""',
      display: 'block',
      width: 8,
      height: 8,
      borderRadius: '999px',
      bgcolor: 'rgba(255,255,255,0.4)',
      transition: 'width 250ms ease-out, background-color 250ms ease-out'
    },
    '&[aria-pressed="true"]::before': { width: 24, bgcolor: 'common.white' },
    '&:focus-visible': { outline: '2px solid', outlineColor: 'common.white' }
  },
  // Широкий экран: миниатюры постеров справа внизу
  thumbs: {
    position: 'absolute',
    right: { lg: 32, xl: 40 },
    bottom: { lg: 32, xl: 40 },
    display: { xs: 'none', lg: 'flex' },
    gap: 1.25,
    m: 0,
    p: 0,
    listStyle: 'none'
  },
  thumb: {
    display: 'block',
    width: { lg: 56, xl: 64 },
    aspectRatio: '2 / 3',
    p: 0,
    border: '2px solid transparent',
    borderRadius: '10px',
    overflow: 'hidden',
    bgcolor: 'grey.800',
    cursor: 'pointer',
    opacity: 0.55,
    transition: 'opacity 200ms ease-out, transform 200ms ease-out, border-color 200ms ease-out',
    '& img': { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
    '&:hover': { opacity: 0.9 },
    '&[aria-pressed="true"]': {
      opacity: 1,
      borderColor: 'common.white',
      [MOTION]: { transform: 'translateY(-4px)' }
    },
    '&:focus-visible': { outline: '2px solid', outlineColor: 'common.white', outlineOffset: 2 }
  },
  skeleton: {
    minHeight: { xs: 540, sm: 420, md: 440, xl: 520 },
    borderRadius: { xs: '16px', md: '24px' },
    transform: 'none'
  }
} satisfies Record<string, SxProps<Theme>>
