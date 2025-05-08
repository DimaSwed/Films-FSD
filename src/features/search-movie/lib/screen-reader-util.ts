export const announceToScreenReader = (message: string) => {
  const announcer = document.getElementById('screen-reader-announcer')
  if (announcer) {
    announcer.textContent = message
  }
}
