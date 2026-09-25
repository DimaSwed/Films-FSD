import { TMDB_IMAGE_BASE } from '@/shared/config'

export type TTmdbImageSize = 'w45' | 'w500' | 'original'

export const getTmdbImageUrl = (path: string | null | undefined, size: TTmdbImageSize = 'w500') =>
  path ? `${TMDB_IMAGE_BASE}/${size}${path}` : ''
