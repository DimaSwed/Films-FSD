import { Box, Tooltip } from '@mui/material'
import { FC } from 'react'

import { getTmdbImageUrl } from '@/shared/lib'

import type { IWatchProvider } from '../model'

interface IWatchProvidersProps {
  providers: IWatchProvider[]
}

/** Компактный ряд иконок провайдеров (с подсказкой-названием). */
export const WatchProviders: FC<IWatchProvidersProps> = ({ providers }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
      {providers.map((p) => (
        <Tooltip title={p.provider_name} key={p.provider_id}>
          <img
            src={getTmdbImageUrl(p.logo_path, 'w45')}
            alt={p.provider_name}
            style={{ width: 32, height: 32 }}
          />
        </Tooltip>
      ))}
    </Box>
  )
}
