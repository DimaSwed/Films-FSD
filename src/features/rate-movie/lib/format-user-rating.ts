import { TMDB_LANGUAGE } from '@/shared/config'

const ratingFormat = new Intl.NumberFormat(TMDB_LANGUAGE, { maximumFractionDigits: 1 })

/** Оценка для показа: на сайте TMDB можно поставить и половинку — «8,5». */
export const formatUserRating = (value: number) => ratingFormat.format(value)
