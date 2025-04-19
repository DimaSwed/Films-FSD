import { FC, useEffect, useState } from 'react'
import { useSessionId } from '@/features/auth'
import { useAddToWatchlist, useRemoveFromWatchList, useWatchList } from '@/features/watch-list'
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
  const { filteredMovies } = useWatchList()

  const isInWatchlist = filteredMovies?.some((m) => m.id === movieId) ?? false
  const [localState, setLocalState] = useState(isInWatchlist)

  useEffect(() => setLocalState(isInWatchlist), [isInWatchlist])

  const { mutate: addToWatchlist, isPending: isAdding, isError: isAddError } = useAddToWatchlist()
  const {
    mutate: removeFromWatchlist,
    isPending: isRemoving,
    isError: isRemoveError
  } = useRemoveFromWatchList()

  const handleClick = () => {
    if (!sessionId) return
    if (localState) {
      removeFromWatchlist(movieId, { onSuccess: () => setLocalState(false) })
    } else {
      addToWatchlist(movieId, { onSuccess: () => setLocalState(true) })
    }
  }

  return (
    <Button
      variant="contained"
      color={localState ? 'secondary' : 'primary'}
      startIcon={
        localState ? (
          isRemoving ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <CheckCircle />
          )
        ) : (
          <AddIcon />
        )
      }
      onClick={handleClick}
      disabled={isAdding || isRemoving || !sessionId}
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
              : localState
                ? 'В списке'
                : 'Добавить в список')}
    </Button>
  )
}
