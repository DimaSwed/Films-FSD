import { SxProps, Theme } from '@mui/material'

/** Ширина колонки с годом; от неё же считается положение линии ленты. */
const YEAR_COLUMN = { xs: 48, sm: 64 }

const dotColor = (theme: Theme) =>
  theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.accent.main

export const personFilmographyStyles = {
  tabs: {
    mb: 2,
    '& .MuiTabs-indicator': { bgcolor: 'text.primary' }
  },
  tab: { textTransform: 'none', minWidth: { xs: 0, sm: 90 }, px: { xs: 1, sm: 2 } },
  tabCount: { ml: 0.25, color: 'text.secondary', fontWeight: 400 },
  years: { listStyle: 'none', m: 0, p: 0 },
  year: {
    display: 'grid',
    gridTemplateColumns: { xs: `${YEAR_COLUMN.xs}px 1fr`, sm: `${YEAR_COLUMN.sm}px 1fr` },
    columnGap: { xs: 1.5, sm: 2.5 }
  },
  yearLabel: {
    pt: 1.25,
    fontWeight: 700,
    fontVariantNumeric: 'tabular-nums',
    color: 'text.secondary',
    textAlign: 'right'
  },
  // Вертикальная линия ленты с точкой напротив года
  entries: {
    position: 'relative',
    listStyle: 'none',
    m: 0,
    p: 0,
    pl: { xs: 1.5, sm: 2.5 },
    pb: 1.5,
    borderLeft: '2px solid',
    borderColor: 'outline.soft',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 14,
      left: -7,
      width: 12,
      height: 12,
      borderRadius: '50%',
      bgcolor: dotColor,
      border: '2px solid',
      borderColor: 'background.paper'
    }
  },
  entry: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 2,
    py: 1,
    px: 1.25,
    mx: -1.25,
    borderRadius: '8px',
    '@media (hover: hover)': { '&:hover': { bgcolor: 'action.hover' } }
  },
  title: {
    fontWeight: 500,
    color: 'text.primary',
    textDecoration: 'none',
    overflowWrap: 'anywhere',
    '&:hover': { textDecoration: 'underline', textUnderlineOffset: '3px' },
    '&:focus-visible': {
      outline: '3px solid',
      outlineColor: 'accent.main',
      outlineOffset: '2px',
      borderRadius: '4px'
    }
  },
  role: { display: 'block', mt: 0.25, color: 'text.secondary', overflowWrap: 'anywhere' },
  soon: {
    ml: 1,
    px: 0.75,
    py: 0.25,
    borderRadius: '6px',
    border: '1px solid',
    borderColor: 'outline.strong',
    color: 'text.secondary',
    whiteSpace: 'nowrap',
    verticalAlign: 'text-bottom'
  },
  rating: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    pt: 0.25,
    color: 'text.secondary',
    fontVariantNumeric: 'tabular-nums'
  },
  showAll: { mt: 1, ml: { xs: `${YEAR_COLUMN.xs}px`, sm: `${YEAR_COLUMN.sm}px` } }
} satisfies Record<string, SxProps<Theme>>
