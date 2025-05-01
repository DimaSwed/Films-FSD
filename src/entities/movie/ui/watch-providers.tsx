import { FC } from 'react'
import { Box, Tooltip } from '@mui/material'

interface IProvider {
  provider_id: number
  provider_name: string
  logo_path: string
}

interface Props {
  providers: IProvider[]
}

export const WatchProviders: FC<Props> = ({ providers }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
      {providers.map((p) => (
        <Tooltip title={p.provider_name} key={p.provider_id}>
          <img
            src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
            alt={p.provider_name}
            style={{ width: 32, height: 32 }}
          />
        </Tooltip>
      ))}
    </Box>
  )
}
