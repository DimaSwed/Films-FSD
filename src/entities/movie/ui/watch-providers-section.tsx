import { Box, Link, Skeleton, Typography } from '@mui/material'
import { FC } from 'react'

import { JustWatchAttribution } from '@/shared/ui'

import { hasWatchProviders } from '../lib'
import type { IWatchProviders } from '../model'

import { WatchProviderItem } from './watch-provider-item'

const GROUPS: { key: 'flatrate' | 'free' | 'rent' | 'buy'; title: string }[] = [
  { key: 'flatrate', title: 'По подписке' },
  { key: 'free', title: 'Бесплатно' },
  { key: 'rent', title: 'Аренда' },
  { key: 'buy', title: 'Покупка' }
]

interface IWatchProvidersSectionProps {
  providers?: IWatchProviders
  isLoading?: boolean
  isError?: boolean
}

/** Блок «Где смотреть»: группы подписка / бесплатно / аренда / покупка, ссылка на TMDB и атрибуция JustWatch. */
export const WatchProvidersSection: FC<IWatchProvidersSectionProps> = ({
  providers,
  isLoading,
  isError
}) => {
  const hasData = !!providers && hasWatchProviders(providers)

  const renderBody = () => {
    if (isLoading) {
      return <Skeleton variant="rounded" height={96} sx={{ mt: 1 }} />
    }

    if (isError) {
      return (
        <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.8 }}>
          Не удалось загрузить данные о том, где смотреть этот фильм.
        </Typography>
      )
    }

    if (!providers || !hasData) {
      return (
        <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.8 }}>
          Для России пока нет данных о том, где смотреть этот фильм.
        </Typography>
      )
    }

    return (
      <>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
          {GROUPS.filter(({ key }) => providers[key].length > 0).map(({ key, title }) => (
            <Box key={key}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {title}
              </Typography>
              <Box
                component="ul"
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1.5,
                  listStyle: 'none',
                  m: 0,
                  mt: 0.5,
                  p: 0
                }}
              >
                {providers[key].map((provider) => (
                  <WatchProviderItem key={provider.provider_id} provider={provider} />
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {providers.link && (
          <Typography variant="body2" sx={{ mt: 1.5 }}>
            <Link
              href={providers.link}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="always"
            >
              Все варианты просмотра на TMDB
            </Link>
          </Typography>
        )}
      </>
    )
  }

  return (
    <Box component="section" aria-labelledby="watch-providers-title">
      <Typography id="watch-providers-title" variant="h4" component="h2">
        Где смотреть в России
      </Typography>

      {renderBody()}

      <JustWatchAttribution sx={{ mt: 1 }} />
    </Box>
  )
}
