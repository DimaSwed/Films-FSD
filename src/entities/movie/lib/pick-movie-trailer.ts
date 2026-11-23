import type { IMovieTrailer, IMovieVideoRaw } from '../model'

const TYPES: IMovieTrailer['type'][] = ['Trailer', 'Teaser']
const LANGUAGES: IMovieTrailer['language'][] = ['ru', 'en', null]

const getLanguage = ({ iso_639_1 }: IMovieVideoRaw): IMovieTrailer['language'] =>
  iso_639_1 === 'ru' || iso_639_1 === 'en' ? iso_639_1 : null

/** Чем меньше, тем лучше: сначала тип, внутри типа — язык, внутри языка — официальные ролики. */
const getRank = (video: IMovieVideoRaw): number =>
  TYPES.indexOf(video.type as IMovieTrailer['type']) * 100 +
  LANGUAGES.indexOf(getLanguage(video)) * 10 +
  (video.official ? 0 : 1)

/**
 * Один ролик для показа: трейлер важнее тизера, русский важнее английского, официальный важнее
 * любительского; при равенстве — самый новый. `null`, если подходящего ролика на YouTube нет.
 */
export const pickMovieTrailer = (videos: IMovieVideoRaw[] = []): IMovieTrailer | null => {
  const [best] = videos
    .filter(
      ({ site, type, key }) =>
        site === 'YouTube' && !!key && TYPES.includes(type as IMovieTrailer['type'])
    )
    .sort(
      (a, b) =>
        getRank(a) - getRank(b) || (b.published_at ?? '').localeCompare(a.published_at ?? '')
    )

  return best
    ? { key: best.key, type: best.type as IMovieTrailer['type'], language: getLanguage(best) }
    : null
}
