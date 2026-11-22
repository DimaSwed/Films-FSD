import { Box, Typography } from '@mui/material'
import { FC } from 'react'

import { getTmdbImageUrl } from '@/shared/lib'

import type { IWatchProvider } from '../model'

interface IWatchProviderItemProps {
  provider: IWatchProvider
}

/** Пункт списка: логотип с рамкой (чёрные логотипы не сливаются с тёмной темой) и видимое название. */
export const WatchProviderItem: FC<IWatchProviderItemProps> = ({ provider }) => (
  <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Box
      component="img"
      src={getTmdbImageUrl(provider.logo_path, 'w45')}
      alt=""
      width={32}
      height={32}
      sx={{
        boxSizing: 'border-box',
        border: '1px solid rgba(128, 128, 128, 0.5)',
        borderRadius: '6px'
      }}
    />
    <Typography variant="body2">{provider.provider_name}</Typography>
  </Box>
)
