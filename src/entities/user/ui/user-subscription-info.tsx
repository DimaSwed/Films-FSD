// src/entities/user/ui/UserSubscriptionInfo.tsx
import { FC } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useUserDetails } from '@/features/user/hooks'
import avatar from '@/shared/assets/images/avatar.png'

export const UserSubscriptionInfo: FC = () => {
  const { data: user, isLoading, error } = useUserDetails()

  if (isLoading) {
    return (
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.paper',
          width: '100%'
        }}
      >
        <CircularProgress sx={{ color: 'primary.light', m: 2 }} />
      </Typography>
    )
  }

  if (error) {
    return <Typography>Error loading user data</Typography>
  }

  if (!user) {
    return <Typography>Not authenticated</Typography>
  }

  return (
    <Box
      sx={{
        padding: '10px',
        textAlign: 'center',
        color: 'text.primary'
      }}
    >
      {user.avatar?.tmdb?.avatar_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${user.avatar.tmdb.avatar_path}`}
          alt="avatar"
          width="90"
          height="95"
          style={{ margin: '0 auto 10px auto', borderRadius: '50%' }}
        />
      ) : (
        <img
          src={avatar}
          alt="default avatar"
          width="90"
          height="95"
          style={{ margin: '0 auto 10px auto', borderRadius: '50%' }}
        />
      )}

      <Typography variant="body1" mb={1}>
        {user.username}
      </Typography>
      <Typography variant="body2" mb={1}>
        ID: {user.id}
      </Typography>
      {user.email && (
        <Typography variant="body2" mb={1}>
          {user.email}
        </Typography>
      )}
    </Box>
  )
}
