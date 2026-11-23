import { SCREEN_READER_ANNOUNCER_ID } from '../../lib'

const visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden'
} as const

/** ARIA live-регион: сюда `announceToScreenReader` пишет сообщения для скринридера. */
export const ScreenReaderAnnouncer = () => (
  <div
    id={SCREEN_READER_ANNOUNCER_ID}
    aria-live="polite"
    aria-atomic="true"
    style={visuallyHidden}
  />
)
