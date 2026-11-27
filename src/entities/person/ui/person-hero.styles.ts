import { keyframes, SxProps, Theme } from '@mui/material'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
`

const MOTION = '@media (prefers-reduced-motion: no-preference)'

/**
 * Шапка тёмная в обеих темах, как у страницы фильма. Акцентная полоса — декор, не текст:
 * в светлой теме киноварь, в тёмной `primary` сливается с фоном, поэтому берём `accent`.
 */
const accentColor = (theme: Theme) =>
  theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.accent.main

export const personHeroStyles = {
  root: {
    position: 'relative',
    isolation: 'isolate',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: { xs: 'center', md: 'flex-start' },
    gap: { xs: 2.5, md: 5 },
    // Снизу место под «киноплёнку»
    padding: { xs: '20px 15px 36px', md: '40px 30px 52px' },
    color: 'common.white',
    bgcolor: 'grey.900'
  },
  // Кадр самого известного фильма, размытый: картинка маленькая (w300), резкой она бы не выглядела
  backdrop: {
    position: 'absolute',
    inset: -40,
    zIndex: -2,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(28px) saturate(1.1)',
    opacity: 0.55
  },
  // Затемнение: текст белый в обеих темах
  shade: {
    position: 'absolute',
    inset: 0,
    zIndex: -1,
    background:
      'linear-gradient(100deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.6) 100%)'
  },
  // Перфорация киноплёнки по нижнему краю
  filmStrip: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    height: 8,
    zIndex: -1,
    backgroundImage:
      'repeating-linear-gradient(90deg, rgba(255,255,255,0.16) 0 12px, transparent 12px 26px)',
    borderRadius: '2px'
  },
  photoFrame: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: { xs: 180, md: 260 },
    aspectRatio: '2 / 3',
    borderRadius: '12px',
    overflow: 'hidden',
    bgcolor: 'grey.800',
    border: '1px solid rgba(255, 255, 255, 0.14)',
    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.55)',
    [MOTION]: { animation: `${fadeUp} 500ms ease-out both` }
  },
  photo: { width: '100%', height: '100%', objectFit: 'cover' },
  body: {
    flexGrow: 1,
    minWidth: 0,
    width: '100%',
    [MOTION]: { animation: `${fadeUp} 500ms 120ms ease-out both` }
  },
  overline: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    mb: 1.5,
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'rgba(255, 255, 255, 0.75)',
    '&::before': {
      content: '""',
      flexShrink: 0,
      width: 32,
      height: 3,
      borderRadius: '2px',
      bgcolor: accentColor
    }
  },
  name: { overflowWrap: 'anywhere' },
  originalName: { mt: 0.75, color: 'rgba(255, 255, 255, 0.7)' },
  facts: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
    gap: 2,
    m: 0,
    mt: 3,
    pt: 2.5,
    borderTop: '1px solid rgba(255, 255, 255, 0.14)'
  },
  factLabel: { color: 'rgba(255, 255, 255, 0.7)' },
  factValue: { m: 0, mt: 0.5, overflowWrap: 'anywhere' },
  biography: { mt: 3, maxWidth: '75ch' },
  biographyText: { whiteSpace: 'pre-line' },
  biographyMissing: { mt: 3, color: 'rgba(255, 255, 255, 0.7)', fontStyle: 'italic' },
  readMore: {
    mt: 1,
    px: 0,
    minWidth: 0,
    color: 'common.white',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    '@media (hover: hover)': { '&:hover': { bgcolor: 'transparent', opacity: 0.8 } }
  }
} satisfies Record<string, SxProps<Theme>>
