/** Превью 480×360 (4:3 с чёрными полосами): при `object-fit: cover` в кадре 16:9 полосы обрезаются. */
export const getYoutubePreviewUrl = (key: string) =>
  `https://img.youtube.com/vi/${encodeURIComponent(key)}/hqdefault.jpg`

export const getYoutubeEmbedUrl = (key: string) =>
  `https://www.youtube-nocookie.com/embed/${encodeURIComponent(key)}?autoplay=1&playsinline=1&rel=0&hl=ru`

export const getYoutubeWatchUrl = (key: string) =>
  `https://www.youtube.com/watch?v=${encodeURIComponent(key)}`
