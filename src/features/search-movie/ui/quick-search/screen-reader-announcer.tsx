import { visuallyHidden } from '@/shared/lib'

import { SCREEN_READER_ANNOUNCER_ID } from '../../lib'

/** ARIA live-регион: сюда `announceToScreenReader` пишет сообщения для скринридера. */
export const ScreenReaderAnnouncer = () => (
  <div
    id={SCREEN_READER_ANNOUNCER_ID}
    aria-live="polite"
    aria-atomic="true"
    style={visuallyHidden}
  />
)
