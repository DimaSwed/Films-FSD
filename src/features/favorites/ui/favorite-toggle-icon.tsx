import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { IconButton, CircularProgress } from '@mui/material'
import { keyframes } from '@mui/system'
import { FC } from 'react'

import { useSessionId } from '@/entities/user'

import { useAddToFavorites, useIsFavorite, useRemoveFromFavorites } from '../model'

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`

interface IFavoriteToggleIconProps {
  movieId: number
  size?: 'small' | 'medium' | 'large'
}

export const FavoriteToggleIcon: FC<IFavoriteToggleIconProps> = ({ movieId, size = 'medium' }) => {
  const sessionId = useSessionId()
  const { isFavorite, isLoading, isError } = useIsFavorite(movieId)

  const { mutate: addToFavorites, isPending: isAdding } = useAddToFavorites()
  const { mutate: removeFromFavorites, isPending: isRemoving } = useRemoveFromFavorites()

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!sessionId || isLoading) return

    if (isFavorite) {
      removeFromFavorites(movieId)
    } else {
      addToFavorites(movieId)
    }
  }

  if (isLoading) {
    return (
      <IconButton size={size} disabled>
        <CircularProgress size={20} color="inherit" />
      </IconButton>
    )
  }

  if (isError) {
    return (
      <IconButton size={size} disabled sx={{ color: 'grey.400' }}>
        <FavoriteBorderIcon />
      </IconButton>
    )
  }

  return (
    <IconButton
      size={size}
      aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
      onClick={handleClick}
      disabled={isAdding || isRemoving || !sessionId}
      sx={{
        color: isFavorite ? 'error.main' : 'grey',
        '&:hover': {
          color: isFavorite ? 'error.dark' : 'grey.600',
          backgroundColor: 'transparent'
        },
        transition: 'color 0.2s ease',
        '&.Mui-disabled': {
          color: isFavorite ? 'error.light' : 'grey.400'
        },
        animation: isAdding || isRemoving ? `${pulse} 1s infinite` : 'none'
      }}
    >
      {isAdding || isRemoving ? (
        <CircularProgress size={20} color="inherit" />
      ) : isFavorite ? (
        <FavoriteIcon />
      ) : (
        <FavoriteBorderIcon />
      )}
    </IconButton>
  )
}
