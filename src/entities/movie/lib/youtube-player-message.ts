/** Сообщение, после которого плеер YouTube начинает присылать странице своё состояние. */
export const YOUTUBE_LISTEN_MESSAGE = JSON.stringify({ event: 'listening', id: 1 })

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

/**
 * Плеер не играет, пока зритель не войдёт в аккаунт («подтвердите, что вы не бот» и подобное).
 * Отдельного кода в IFrame API для этого нет, поле `videoData.errorCode` не документировано
 * (замер 2026-11-24). Исчезнет — просто останется собственный экран YouTube внутри плеера.
 */
export const isYoutubeAuthRequired = (data: unknown): boolean => {
  if (typeof data !== 'string') return false
  try {
    const message: unknown = JSON.parse(data)
    return (
      isRecord(message) &&
      isRecord(message.info) &&
      isRecord(message.info.videoData) &&
      message.info.videoData.errorCode === 'auth'
    )
  } catch {
    return false
  }
}
