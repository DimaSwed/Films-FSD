import { FC, MouseEvent } from 'react'
import { CircularProgress, IconButton } from '@mui/material'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import { useSessionId } from '@/entities/user'
import { useAddToWatchlist, useIsInWatchlist, useRemoveFromWatchList } from '@/features/watch-list'

interface IWatchlistToggleIconProps {
  movieId: number
  size?: 'small' | 'medium' | 'large'
}

export const WatchlistToggleIcon: FC<IWatchlistToggleIconProps> = ({
  movieId,
  size = 'medium'
}) => {
  const sessionId = useSessionId()
  const { isInWatchlist, isLoading } = useIsInWatchlist(movieId)

  const { mutate: addToWatchlist, isPending: isAdding } = useAddToWatchlist()
  const { mutate: removeFromWatchlist, isPending: isRemoving } = useRemoveFromWatchList()

  const isBusy = isLoading || isAdding || isRemoving

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation()
    if (!sessionId || isBusy) return

    if (isInWatchlist) {
      removeFromWatchlist(movieId)
    } else {
      addToWatchlist(movieId)
    }
  }

  return (
    <IconButton
      size={size}
      aria-label={isInWatchlist ? 'Убрать из списка к просмотру' : 'Добавить в список к просмотру'}
      onClick={handleClick}
      disabled={isBusy || !sessionId}
      sx={{
        color: isInWatchlist ? 'success.main' : 'grey',
        '&:hover': {
          color: isInWatchlist ? 'success.dark' : 'grey.600',
          backgroundColor: 'transparent'
        },
        transition: 'color 0.2s ease',
        '&.Mui-disabled': { color: isInWatchlist ? 'success.light' : 'grey.400' }
      }}
    >
      {isBusy ? (
        <CircularProgress size={20} color="inherit" />
      ) : isInWatchlist ? (
        <BookmarkAddedIcon />
      ) : (
        <BookmarkAddIcon />
      )}
    </IconButton>
  )
}
