import { TMDB_IMAGE_BASE } from '../config'

export type TTmdbImageSize = 'w45' | 'w92' | 'w185' | 'w300' | 'w500' | 'w1280' | 'original'

export const getTmdbImageUrl = (path: string | null | undefined, size: TTmdbImageSize = 'w500') =>
  path ? `${TMDB_IMAGE_BASE}/${size}${path}` : ''
