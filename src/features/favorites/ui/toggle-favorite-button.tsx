import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Button, CircularProgress } from '@mui/material'
import { FC } from 'react'

import { useSessionId } from '@/entities/user'

import { useAddToFavorites, useIsFavorite, useRemoveFromFavorites } from '../model'

interface IToggleFavoriteButtonProps {
  movieId: number
  showText?: boolean
}

export const ToggleFavoriteButton: FC<IToggleFavoriteButtonProps> = ({
  movieId,
  showText = true
}) => {
  const sessionId = useSessionId()
  const { isFavorite, isLoading, isError } = useIsFavorite(movieId)

  const { mutate: addToFavorites, isPending: isAdding } = useAddToFavorites()
  const { mutate: removeFromFavorites, isPending: isRemoving } = useRemoveFromFavorites()

  const handleClick = () => {
    if (!sessionId) return
    if (isFavorite) {
      removeFromFavorites(movieId)
    } else {
      addToFavorites(movieId)
    }
  }

  if (isLoading) {
    return <CircularProgress size={24} />
  }

  if (isError) {
    return (
      <Button disabled variant="contained">
        Ошибка загрузки
      </Button>
    )
  }

  return (
    <Button
      variant="contained"
      color={isFavorite ? 'secondary' : 'primary'}
      startIcon={
        isAdding || isRemoving ? (
          <CircularProgress size={20} color="inherit" />
        ) : isFavorite ? (
          <FavoriteIcon />
        ) : (
          <FavoriteBorderIcon />
        )
      }
      onClick={handleClick}
      disabled={isAdding || isRemoving || !sessionId}
      sx={{
        '&.MuiButton-containedSecondary': {
          backgroundColor: 'error.main',
          color: 'primary.contrastText',
          '&:hover': {
            backgroundColor: 'error.dark'
          }
        }
      }}
    >
      {showText &&
        (isAdding
          ? 'Добавление...'
          : isRemoving
            ? 'Удаление...'
            : isFavorite
              ? 'В избранном'
              : 'В избранное')}
    </Button>
  )
}
