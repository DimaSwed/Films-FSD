import { Box, Typography } from '@mui/material'
import { FC } from 'react'

import type { IWatchProvider } from '../model'

import { WatchProviderLogo } from './watch-provider-logo'

interface IWatchProviderItemProps {
  provider: IWatchProvider
}

/** Пункт списка: логотип и видимое название. */
export const WatchProviderItem: FC<IWatchProviderItemProps> = ({ provider }) => (
  <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <WatchProviderLogo provider={provider} size={32} />
    <Typography variant="body2">{provider.provider_name}</Typography>
  </Box>
)
