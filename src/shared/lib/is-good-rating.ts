const GOOD_RATING = 7

/** Хороший ли рейтинг по шкале от 0 до 10. Хороший на карточках показываем зелёным. */
export const isGoodRating = (rating: number) => rating >= GOOD_RATING
