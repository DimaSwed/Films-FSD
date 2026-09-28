import { Box, Tooltip } from '@mui/material'
import { FC } from 'react'

import { getTmdbImageUrl } from '@/shared/lib'

interface IProvider {
  provider_id: number
  provider_name: string
  logo_path: string
}

interface IProps {
  providers: IProvider[]
}

export const WatchProviders: FC<IProps> = ({ providers }) => {
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
