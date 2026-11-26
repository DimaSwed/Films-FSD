import FavoriteIcon from '@mui/icons-material/Favorite'
import { CircularProgress, IconButton } from '@mui/material'
import { useIsMutating } from '@tanstack/react-query'
import { FC, MouseEvent } from 'react'

import { focusNeighbourCard, IMovie } from '@/shared/lib'

import { REMOVE_FROM_FAVORITES_KEY } from '../model'

interface IRemoveFavoriteButtonProps {
  movie: IMovie
  /** Удаление с отменой (`useRemoveFromFavoritesWithUndo`) — живёт на уровне страницы. */
  onRemove: (movie: IMovie) => void
}

/**
 * Кнопка «Убрать из избранного» поверх постера в списке избранного. В этом списке фильм всегда
 * в избранном, поэтому кнопка не переключатель, а удаление — с возможностью отменить.
 */
export const RemoveFavoriteButton: FC<IRemoveFavoriteButtonProps> = ({ movie, onRemove }) => {
  const isRemoving =
    useIsMutating({
      mutationKey: REMOVE_FROM_FAVORITES_KEY,
      predicate: ({ state }) => state.variables === movie.id
    }) > 0

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.detail === 0) focusNeighbourCard(e.currentTarget)
    onRemove(movie)
  }

  return (
    <IconButton
      aria-label={`Убрать из избранного: ${movie.title}`}
      title="Убрать из избранного"
      disabled={isRemoving}
      onClick={handleClick}
      sx={{
        width: 44,
        height: 44,
        color: 'error.light',
        bgcolor: 'overlay.main',
        transition: 'transform 150ms ease-out, background-color 150ms ease-out',
        '&:hover': { bgcolor: 'overlay.hover' },
        '&:active': { transform: 'scale(0.92)' },
        '&.Mui-disabled': { color: 'error.light', bgcolor: 'overlay.main' },
        '&.Mui-focusVisible': { outline: '3px solid', outlineColor: 'accent.main' }
      }}
    >
      {isRemoving ? (
        <CircularProgress size={20} color="inherit" />
      ) : (
        <FavoriteIcon sx={{ fontSize: 22 }} />
      )}
    </IconButton>
  )
}
