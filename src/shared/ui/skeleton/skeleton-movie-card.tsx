import { FC } from 'react'
import { Box, Card, CardContent, CardActionArea, Typography, Skeleton } from '@mui/material'

export const SkeletonMovieCard: FC = () => {
  return (
    <Box
      sx={{
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)'
        }
      }}
    >
      <Card
        sx={{
          height: '225px',
          width: '150px',
          borderRadius: '10px',
          position: 'relative',
          textAlign: 'center',
          margin: { xs: '0 auto', sm: '0' }
        }}
      >
        <CardActionArea>
          <Skeleton
            variant="rectangular"
            sx={{
              border: '1px solid grey',
              backgroundColor: 'grey',
              height: '225px',
              width: '100%'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: 'grey',
              color: 'white',
              padding: '2px 12px',
              borderRadius: '0 10px 0 10px'
            }}
          >
            <Skeleton width={40} height={20} />
          </Box>
        </CardActionArea>
      </Card>
      <CardContent
        sx={{
          width: '100%',
          padding: '0px',
          maxWidth: { xs: 'auto', sm: '150px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography
          variant="body2"
          color="secondary.contrastText"
          fontWeight={'bold'}
          fontSize="16px"
          component="p"
          sx={{
            width: '100%',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'center',
            alignSelf: 'center'
          }}
        >
          <Skeleton width="80%" height={20} sx={{ margin: '0 auto' }} />
        </Typography>
        <Typography
          variant="body2"
          color="secondary.contrastText"
          component="p"
          sx={{ width: '100%' }}
        >
          <Skeleton width="60%" height={20} sx={{ margin: '0 auto' }} />
        </Typography>
        <Skeleton
          variant="rectangular"
          sx={{ width: '60%', height: '36px', borderRadius: '4px', mt: '3px' }}
        />
      </CardContent>
    </Box>
  )
}
