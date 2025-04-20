import { useState } from 'react'
import { Box, Card, CardMedia, Typography, Stack, Collapse } from '@mui/material'
import { IMovie } from '@/shared/types'
import { RemoveButton, ToggleDescriptionButton } from '@/shared/ui'
import { RatingDisplay } from '@/shared/ui'

interface IMovieCardProps {
  movie: IMovie
  onRemoveFromWatchlist: () => void
}

export const WatchListCard = ({ movie, onRemoveFromWatchlist }: IMovieCardProps) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)

  const toggleDescription = () => {
    setIsDescriptionOpen((prev) => !prev)
  }

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
        mb: 2,
        boxShadow: 4,
        borderRadius: 2,
        bgcolor: 'background.paper'
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 150, height: 225 }}
        image={movie.image}
        alt={movie.title}
      />
      <Box
        sx={{
          flex: 1,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: { xs: 'center', sm: 'flex-start' }
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: 'secondary.contrastText', mb: { xs: '1px', sm: '3px' } }}
        >
          <strong>&quot;{movie.title}&quot;</strong>
        </Typography>

        <Stack gap={'2px'}>
          <RatingDisplay value={movie.rating} />
          <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
            <strong>Год:</strong> {movie.year}
          </Typography>
          <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
            <strong>Жанр:</strong> {movie.genre ?? 'Неизвестно'}
          </Typography>
        </Stack>
        <Collapse in={isDescriptionOpen} timeout="auto" unmountOnExit>
          <Typography
            variant="body2"
            sx={{
              color: 'secondary.contrastText',
              mt: 1,
              width: '100%',
              textAlign: 'justify'
            }}
          >
            <strong>Описание:</strong> {movie.description ?? 'Неизвестно'}
          </Typography>
        </Collapse>

        <Stack
          direction="row"
          mt={2}
          gap={1}
          alignItems="center"
          justifyContent={{ xs: 'center', sm: 'flex-start' }}
          width={'100%'}
          flexWrap={'wrap'}
        >
          <ToggleDescriptionButton isOpen={isDescriptionOpen} onClick={toggleDescription} />
          <RemoveButton onClick={onRemoveFromWatchlist} text="Убрать из списка" />
        </Stack>
      </Box>
    </Card>
  )
}
