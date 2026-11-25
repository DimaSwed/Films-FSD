import { CheckCircle } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import { Button, CircularProgress } from '@mui/material'
import { FC } from 'react'

import { useSessionId } from '@/entities/user'

import { useIsInWatchlist } from '../lib'
import { useAddToWatchlist, useRemoveFromWatchList } from '../model'

interface IToggleWatchlistButtonProps {
  movieId: number
}

export const ToggleWatchlistButton: FC<IToggleWatchlistButtonProps> = ({ movieId }) => {
  const sessionId = useSessionId()
  const { isInWatchlist, isLoading: isStateLoading } = useIsInWatchlist(movieId)

  const { mutate: addToWatchlist, isPending: isAdding, isError: isAddError } = useAddToWatchlist()
  const {
    mutate: removeFromWatchlist,
    isPending: isRemoving,
    isError: isRemoveError
  } = useRemoveFromWatchList()

  const handleClick = () => {
    if (!sessionId) return
    if (isInWatchlist) {
      removeFromWatchlist(movieId)
    } else {
      addToWatchlist(movieId)
    }
  }

  return (
    <Button
      variant={isInWatchlist ? 'contained' : 'outlined'}
      color={isInWatchlist ? 'success' : 'inherit'}
      startIcon={
        isStateLoading || isAdding || isRemoving ? (
          <CircularProgress size={20} color="inherit" />
        ) : isInWatchlist ? (
          <CheckCircle />
        ) : (
          <AddIcon />
        )
      }
      onClick={handleClick}
      disabled={isAdding || isRemoving || !sessionId || isStateLoading}
    >
      {isAddError || isRemoveError
        ? 'Ошибка'
        : isAdding
          ? 'Добавление...'
          : isRemoving
            ? 'Удаление...'
            : isInWatchlist
              ? 'В списке'
              : 'Добавить в список'}
    </Button>
  )
}
