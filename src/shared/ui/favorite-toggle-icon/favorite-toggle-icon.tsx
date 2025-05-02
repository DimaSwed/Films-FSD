import { FC } from 'react'
import { useSessionId } from '@/features/auth'
import { useAddToFavorites, useFavorites, useRemoveFromFavorites } from '@/features/favorites'
import { IconButton, CircularProgress } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { keyframes } from '@mui/system'

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
  const { data: favorites, isLoading, isError } = useFavorites()

  const isFavorite = favorites?.results?.some((m) => m.id === movieId) ?? false

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
