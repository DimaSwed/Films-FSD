import { FC } from 'react'
import { useSessionId } from '@/features/auth'
import { useAddToWatchlist, useRemoveFromWatchList, useIsInWatchlist } from '@/features/watch-list'
import { Button, CircularProgress } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'

interface IToggleWatchlistButtonProps {
  movieId: number
  showText?: boolean
}

export const ToggleWatchlistButton: FC<IToggleWatchlistButtonProps> = ({
  movieId,
  showText = true
}) => {
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
      variant="contained"
      color={isInWatchlist ? 'secondary' : 'primary'}
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
      sx={{
        '&.MuiButton-containedSecondary': {
          backgroundColor: 'success.main',
          color: 'primary.contrastText',
          '&:hover': {
            backgroundColor: 'success.dark'
          }
        }
      }}
    >
      {showText &&
        (isAddError || isRemoveError
          ? 'Ошибка'
          : isAdding
            ? 'Добавление...'
            : isRemoving
              ? 'Удаление...'
              : isInWatchlist
                ? 'В списке'
                : 'Добавить в список')}
    </Button>
  )
}
