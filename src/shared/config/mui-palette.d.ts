import '@mui/material/styles'

/** Цвета темы, которых нет в стандартной палитре MUI. Значения — в `app/styles/theme.ts`. */
interface IAppPalette {
  /** Шапка и сайдбар: тёмные в обеих темах, поэтому не зависят от `primary`. */
  navigation: { main: string; hover: string; contrastText: string }
  /** Рамки: `strong` — поля и переключатели, `soft` — карточки и разделители. */
  outline: { strong: string; soft: string }
  /** Ссылки в тексте и подсветка активного пункта. */
  accent: { main: string }
  /** Подложка под значками и кнопками поверх постера. */
  overlay: { main: string; hover: string }
}

declare module '@mui/material/styles' {
  interface Palette {
    navigation: IAppPalette['navigation']
    outline: IAppPalette['outline']
    accent: IAppPalette['accent']
    overlay: IAppPalette['overlay']
  }
  interface PaletteOptions {
    navigation: IAppPalette['navigation']
    outline: IAppPalette['outline']
    accent: IAppPalette['accent']
    overlay: IAppPalette['overlay']
  }
  interface TypeBackground {
    /** Карточки и строки списков поверх `paper`. */
    card: string
  }
}
