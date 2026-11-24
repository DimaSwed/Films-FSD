import type { IMovieTrailer } from '../model'

const TYPE_LABELS: Record<IMovieTrailer['type'], string> = { Trailer: 'Трейлер', Teaser: 'Тизер' }

/** «Трейлер» или «Тизер»; винительный падеж совпадает: «Смотреть трейлер». */
export const getTrailerLabel = ({ type }: IMovieTrailer): string => TYPE_LABELS[type]
