import { SxProps, Theme, alpha, darken, keyframes } from '@mui/material/styles'

const reducedMotion = '@media (prefers-reduced-motion: reduce)'

/** Занавес начинает открываться сразу, отсчёт идёт под него, «404» — последний кадр. */
const CURTAIN_DELAY = 0.15
const COUNTDOWN_DELAY = 0.8
const TICK = 0.55

/** Цифры стартового ракорда — в том порядке, в каком их показывают. */
export const COUNTDOWN = [3, 2, 1]

/** Доля ширины, которую открытый занавес оставляет у края сцены (от половины сцены). */
const OPEN_CURTAIN_SCALE = 0.2

/** Радиус заливки-«стрелки» на ракорде: обводка вдвое толще радиуса закрывает весь кадр. */
export const SWEEP_RADIUS = 100
const SWEEP_LENGTH = 2 * Math.PI * SWEEP_RADIUS

const openCurtain = keyframes`
  from { transform: scaleX(1); }
  to { transform: scaleX(${OPEN_CURTAIN_SCALE}); }
`

const sweep = keyframes`
  from { stroke-dashoffset: ${SWEEP_LENGTH}; }
  to { stroke-dashoffset: 0; }
`

const tick = keyframes`
  0%, 99% { opacity: 1; }
  100% { opacity: 0; }
`

const land = keyframes`
  from { opacity: 0; transform: scale(1.25); }
  to { opacity: 1; transform: scale(1); }
`

/** Неровный свет проектора: амплитуда мала, чтобы экран «дышал», а не мигал. */
const projectorLight = keyframes`
  0%, 100% { opacity: 1; }
  22% { opacity: 0.97; }
  41% { opacity: 0.99; }
  63% { opacity: 0.95; }
  80% { opacity: 0.98; }
`

const rise = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
`

/** Контур ламбрекена: сплошной верх и восемь полукруглых фестонов во всю ширину. */
const scallops =
  'linear-gradient(#000 0 0) 0 0 / 100% 45% no-repeat, radial-gradient(ellipse 50% 100% at 50% 0, #000 97%, transparent) 0 0 / 12.5% 100%'

const appear = (delay: number) => ({
  animation: `${rise} 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both`,
  [reducedMotion]: { animation: 'none' }
})

const focusRing = {
  '&:focus-visible': { outline: '2px solid var(--trim)', outlineOffset: '3px' }
}

/**
 * Цвета зала — только из темы. Светлая тема — «цветное кино»: синий зал, кирпичный бархат, золото.
 * Тёмная — чёрно-белое: серый занавес и единственный акцент цвета ошибки.
 */
const hallColors = ({ palette }: Theme) =>
  palette.mode === 'light'
    ? {
        '--hall': palette.primary.dark,
        '--hall-deep': darken(palette.primary.dark, 0.5),
        '--glow': alpha(palette.primary.light, 0.55),
        '--curtain': palette.error.main,
        '--curtain-fold': darken(palette.error.dark, 0.35),
        '--curtain-light': palette.error.light,
        '--trim': palette.secondary.main,
        '--screen': palette.background.default,
        '--ink': palette.primary.dark,
        '--accent': palette.secondary.light,
        '--text': palette.primary.contrastText,
        '--text-muted': alpha(palette.primary.contrastText, 0.8),
        '--line': alpha(palette.primary.contrastText, 0.24),
        '--seat-back': darken(palette.primary.dark, 0.25),
        '--seat-front': darken(palette.primary.dark, 0.7)
      }
    : {
        '--hall': palette.background.default,
        '--hall-deep': palette.primary.dark,
        '--glow': alpha(palette.primary.light, 0.6),
        '--curtain': palette.secondary.main,
        '--curtain-fold': palette.secondary.dark,
        '--curtain-light': palette.secondary.light,
        '--trim': palette.text.secondary,
        '--screen': darken(palette.text.primary, 0.12),
        '--ink': palette.primary.main,
        '--accent': palette.error.main,
        '--text': palette.text.primary,
        '--text-muted': alpha(palette.text.primary, 0.72),
        '--line': alpha(palette.text.primary, 0.2),
        '--seat-back': palette.secondary.dark,
        '--seat-front': darken(palette.primary.main, 0.6)
      }

export const notFoundStyles = {
  hall: (theme: Theme) => ({
    ...hallColors(theme),
    position: 'relative',
    isolation: 'isolate',
    display: 'flex',
    flexDirection: 'column',
    color: 'var(--text)',
    bgcolor: 'var(--hall)',
    backgroundImage:
      'radial-gradient(ellipse 75% 60% at 50% 24%, var(--glow), transparent), linear-gradient(transparent 45%, var(--hall-deep))'
  }),

  content: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: { xs: 2, sm: 2.5 },
    px: { xs: 2, sm: 4 },
    pt: { xs: 2, sm: 3 },
    pb: { xs: 3, sm: 4 }
  },

  /** Луч проектора: идёт из глубины зала, из-за кресел, и расширяется к экрану. */
  beam: {
    position: 'absolute',
    zIndex: -1,
    top: '18%',
    bottom: -60,
    left: '50%',
    width: 'min(100%, 560px)',
    transform: 'translateX(-50%)',
    clipPath: 'polygon(0 0, 100% 0, 52% 100%, 48% 100%)',
    background: 'linear-gradient(to top, var(--screen), transparent 92%)',
    filter: 'blur(6px)',
    opacity: 0.08,
    pointerEvents: 'none'
  },

  // Ширина зависит и от высоты окна: на низком экране заголовок и кнопки остаются на виду
  stage: {
    position: 'relative',
    width: 'min(100%, 600px, max(62dvh, 260px))',
    aspectRatio: '16 / 9',
    flexShrink: 0,
    overflow: 'hidden',
    borderBottom: '4px solid var(--trim)',
    borderRadius: '4px 4px 0 0',
    bgcolor: 'var(--hall-deep)'
  },

  screen: {
    position: 'absolute',
    inset: '5% 8%',
    width: '84%',
    height: '90%',
    boxShadow: '0 0 48px var(--glow)',
    animation: `${projectorLight} 3.2s steps(1) infinite`,
    [reducedMotion]: { animation: 'none' },

    '& .sweep': {
      strokeDasharray: SWEEP_LENGTH,
      strokeDashoffset: SWEEP_LENGTH,
      animation: `${sweep} ${TICK}s linear ${COUNTDOWN_DELAY}s ${COUNTDOWN.length}`,
      [reducedMotion]: { animation: 'none' }
    },
    '& .digit': { opacity: 0 },
    ...Object.fromEntries(
      COUNTDOWN.map((digit, index) => [
        `& .digit-${digit}`,
        {
          animation: `${tick} ${TICK}s linear ${COUNTDOWN_DELAY + index * TICK}s`,
          [reducedMotion]: { animation: 'none' }
        }
      ])
    ),
    '& .code': {
      transformBox: 'view-box',
      transformOrigin: 'center',
      animation: `${land} 0.28s cubic-bezier(0.16, 1, 0.3, 1) ${COUNTDOWN_DELAY + COUNTDOWN.length * TICK}s both`,
      [reducedMotion]: { animation: 'none' }
    }
  },

  curtain: (side: 'left' | 'right') => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    [side]: 0,
    width: '50.5%',
    transformOrigin: side,
    transform: `scaleX(${OPEN_CURTAIN_SCALE})`,
    // Нижняя кайма лежит поверх складок бархата
    background: `linear-gradient(var(--trim), var(--trim)) bottom / 100% 5px no-repeat,
      linear-gradient(transparent 55%, var(--curtain-fold)),
      repeating-linear-gradient(90deg, var(--curtain-fold) 0, var(--curtain) 5%, var(--curtain-light) 8%, var(--curtain) 12%, var(--curtain-fold) 16.66%)`,
    animation: `${openCurtain} 1.5s cubic-bezier(0.65, 0, 0.2, 1) ${CURTAIN_DELAY}s both`,
    [reducedMotion]: { animation: 'none' }
  }),

  /** Ламбрекен: золотая кайма — тот же контур, но чуть длиннее, под бархатом. */
  valance: {
    position: 'absolute',
    inset: '0 0 auto',
    height: '15%',
    filter: 'drop-shadow(0 3px 4px var(--curtain-fold))',
    '&::before, &::after': { content: '""', position: 'absolute', inset: 0, mask: scallops },
    '&::before': { bgcolor: 'var(--trim)' },
    '&::after': {
      bottom: 4,
      background:
        'repeating-linear-gradient(90deg, var(--curtain-fold) 0, var(--curtain) 2%, var(--curtain-light) 6.25%, var(--curtain) 10.5%, var(--curtain-fold) 12.5%)'
    }
  },

  eyebrow: {
    ...appear(0.1),
    letterSpacing: { xs: 3, sm: 4 },
    lineHeight: 1,
    color: 'var(--text-muted)'
  },

  title: {
    ...appear(0.18),
    fontWeight: 700,
    fontSize: 'clamp(28px, 5vw, 52px)',
    lineHeight: 1.05,
    letterSpacing: '-0.01em',
    textTransform: 'uppercase',
    textWrap: 'balance'
  },

  accent: { color: 'var(--accent)' },

  description: {
    ...appear(0.26),
    maxWidth: 480,
    lineHeight: 1.45,
    color: 'var(--text-muted)',
    textWrap: 'pretty'
  },

  actions: {
    ...appear(0.34),
    flexDirection: { xs: 'column', sm: 'row' },
    gap: 1.5,
    width: { xs: '100%', sm: 'auto' },
    maxWidth: { xs: 320, sm: 'none' },
    '& .MuiButton-root': {
      ...focusRing,
      minHeight: 44,
      px: 3,
      boxShadow: 'none',
      transition: 'transform 0.15s ease, background-color 0.2s ease, border-color 0.2s ease',
      '&:active': { transform: 'scale(0.97)' },
      [reducedMotion]: { transition: 'none', '&:active': { transform: 'none' } }
    }
  },

  primaryAction: { '&:hover': { bgcolor: 'secondary.light', boxShadow: 'none' } },

  secondaryAction: {
    borderColor: 'var(--line)',
    '&:hover': { borderColor: 'var(--trim)', bgcolor: 'transparent' }
  },

  program: { ...appear(0.42), width: '100%', maxWidth: 640 },

  programTitle: { mb: 1, color: 'var(--text-muted)' },

  programList: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
    borderBlock: '1px solid var(--line)',
    '& > li + li': {
      borderTop: { xs: '1px solid var(--line)', sm: 0 },
      borderLeft: { sm: '1px solid var(--line)' }
    }
  },

  programLink: {
    ...focusRing,
    display: 'flex',
    alignItems: 'center',
    justifyContent: { xs: 'space-between', sm: 'center' },
    gap: 1,
    minHeight: 48,
    px: 1,
    color: 'inherit',
    fontWeight: 500,
    transition: 'color 0.2s ease',
    '& svg': {
      fontSize: 18,
      color: 'var(--accent)',
      transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
    },
    '@media (hover: hover)': {
      '&:hover': { color: 'var(--accent)' },
      '&:hover svg': { transform: 'translateX(4px)' }
    },
    '&:active': { color: 'var(--accent)' },
    [reducedMotion]: { transition: 'none', '& svg': { transition: 'none' } }
  },

  seats: {
    display: 'block',
    flexShrink: 0,
    width: '100%',
    height: { xs: 86, sm: 102 },
    '& .back': { fill: 'var(--seat-back)', stroke: 'var(--line)' },
    '& .front': { fill: 'var(--seat-front)', stroke: 'var(--line)' }
  }
} satisfies Record<string, SxProps<Theme> | ((side: 'left' | 'right') => SxProps<Theme>)>
