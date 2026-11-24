/** Превью 480×360 (4:3 с чёрными полосами): при `object-fit: cover` в кадре 16:9 полосы обрезаются. */
export const getYoutubePreviewUrl = (key: string) =>
  `https://img.youtube.com/vi/${encodeURIComponent(key)}/hqdefault.jpg`

export const YOUTUBE_PLAYER_ORIGIN = 'https://www.youtube.com'

/**
 * Именно youtube.com, а не youtube-nocookie.com: на втором домене плеер не видит вход зрителя в
 * YouTube, и требование «подтвердите, что вы не бот» нельзя снять даже войдя в аккаунт.
 * `enablejsapi` + `origin` — чтобы плеер сообщал странице о своём состоянии (useYoutubeAuthRequired).
 */
export const getYoutubeEmbedUrl = (key: string) => {
  const params = new URLSearchParams({
    autoplay: '1',
    playsinline: '1',
    rel: '0',
    hl: 'ru',
    enablejsapi: '1',
    origin: window.location.origin
  })
  return `${YOUTUBE_PLAYER_ORIGIN}/embed/${encodeURIComponent(key)}?${params}`
}

export const getYoutubeWatchUrl = (key: string) =>
  `https://www.youtube.com/watch?v=${encodeURIComponent(key)}`
