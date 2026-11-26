import { Box, SxProps, Theme } from '@mui/material'
import { FC } from 'react'

import { getTmdbImageUrl } from '@/shared/lib'

import type { IWatchProvider } from '../model'

interface IWatchProviderLogoProps {
  provider: IWatchProvider
  size: number
  /** Пустой, если название сервиса написано рядом текстом: иначе скринридер прочитает его дважды. */
  alt?: string
}

const frame: SxProps<Theme> = {
  display: 'block',
  flexShrink: 0,
  boxSizing: 'border-box',
  border: '1px solid',
  borderColor: 'outline.soft',
  borderRadius: '6px',
  // Место под картинку видно, пока она загружается
  bgcolor: 'action.hover'
}

/**
 * Логотип сервиса. Рамка нужна, чтобы чёрные логотипы не сливались с тёмной темой, а белые — со
 * светлой. Для экранов с высокой плотностью пикселей берётся картинка вдвое больше.
 */
export const WatchProviderLogo: FC<IWatchProviderLogoProps> = ({ provider, size, alt = '' }) => {
  const { logo_path: path, provider_name: name } = provider

  // Без логотипа — первая буква названия, а не значок битой картинки
  if (!path) {
    return (
      <Box
        component="span"
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        sx={[
          frame,
          {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: size,
            height: size,
            fontSize: size / 2,
            fontWeight: 500
          }
        ]}
      >
        {name.charAt(0)}
      </Box>
    )
  }

  return (
    <Box
      component="img"
      src={getTmdbImageUrl(path, 'w45')}
      srcSet={`${getTmdbImageUrl(path, 'w45')} 1x, ${getTmdbImageUrl(path, 'w92')} 2x`}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      sx={frame}
    />
  )
}
