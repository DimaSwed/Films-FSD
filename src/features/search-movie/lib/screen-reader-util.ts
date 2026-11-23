/** `id` live-региона, в который `announceToScreenReader` пишет сообщения. */
export const SCREEN_READER_ANNOUNCER_ID = 'screen-reader-announcer'

export const announceToScreenReader = (message: string) => {
  const announcer = document.getElementById(SCREEN_READER_ANNOUNCER_ID)
  if (announcer) {
    announcer.textContent = message
  }
}
