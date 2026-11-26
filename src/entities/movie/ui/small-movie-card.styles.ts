import { SxProps, Theme } from '@mui/material'

const HOVER = '@media (hover: hover) and (prefers-reduced-motion: no-preference)'

export const smallMovieCardStyles = {
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    bgcolor: 'background.card',
    borderRadius: '14px',
    overflow: 'hidden',
    border: '1px solid',
    borderColor: 'outline.soft',
    transition: 'transform 200ms ease-out, box-shadow 200ms ease-out',
    [HOVER]: {
      '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
      '&:hover .small-movie-card__poster': { transform: 'scale(1.04)' }
    }
  },
  link: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    '&.Mui-focusVisible': {
      outline: '3px solid',
      outlineColor: 'accent.main',
      outlineOffset: '-3px',
      borderRadius: '14px'
    }
  },
  posterFrame: {
    position: 'relative',
    aspectRatio: '2 / 3',
    overflow: 'hidden',
    bgcolor: 'action.hover'
  },
  poster: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 300ms ease-out'
  },
  noPoster: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    color: 'text.secondary'
  },
  rating: {
    position: 'absolute',
    top: 8,
    left: 8,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3px',
    py: '3px',
    pl: '6px',
    pr: '8px',
    borderRadius: '999px',
    bgcolor: 'overlay.main',
    color: 'common.white',
    fontSize: 13,
    fontWeight: 700,
    lineHeight: 1,
    fontVariantNumeric: 'tabular-nums'
  },
  posterAction: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 1
  },
  content: {
    width: '100%',
    p: 1.5,
    '&:last-child': { pb: 1.5 }
  },
  title: {
    fontWeight: 700,
    lineHeight: 1.3,
    color: 'text.primary',
    minHeight: '2.6em'
  },
  meta: {
    mt: 0.5,
    color: 'text.secondary',
    lineHeight: 1.4
  },
  actions: {
    p: 0.5,
    borderTop: '1px solid',
    borderColor: 'outline.soft',
    gap: 0.5,
    '& > *': { flex: '1 1 0', minWidth: 0 },
    '& > .MuiIconButton-root': {
      flex: '1 1 0',
      height: 44,
      borderRadius: '10px',
      '&:hover': { bgcolor: 'action.hover' }
    }
  }
} satisfies Record<string, SxProps<Theme>>
