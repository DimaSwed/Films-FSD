import { YearLists, IGenreLists } from '@/shared/types/common.types'

export const YEARS_LIST: YearLists[] = [
  'до 1980',
  '1980-1989',
  '1990-1999',
  '2000-2009',
  '2010-2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025'
]

// Массив жанров
export const GENRES_LIST: IGenreLists[] = [
  { id: 28, name: 'Боевик' },
  { id: 12, name: 'Приключения' },
  { id: 16, name: 'Анимация' },
  { id: 35, name: 'Комедия' },
  { id: 80, name: 'Криминал' },
  { id: 18, name: 'Драма' },
  { id: 10751, name: 'Семейный' },
  { id: 14, name: 'Фэнтези' },
  { id: 36, name: 'Исторический' },
  { id: 27, name: 'Ужасы' },
  { id: 10402, name: 'Музыка' },
  { id: 9648, name: 'Детектив' },
  { id: 10749, name: 'Романтика' },
  { id: 878, name: 'Научная фантастика' },
  { id: 10770, name: 'ТВ шоу' },
  { id: 53, name: 'Триллер' },
  { id: 10752, name: 'Военный' },
  { id: 37, name: 'Вестерн' }
]

export const genreMap: Record<number, string> = GENRES_LIST.reduce(
  (acc, genre) => {
    acc[genre.id] = genre.name
    return acc
  },
  {} as Record<number, string>
)

export const MAIN_FILMS_GENRE_LIST: { id: number; title: string }[] = [
  { id: 28, title: 'Боевики' },
  { id: 12, title: 'Приключения' },
  { id: 16, title: 'Анимация' },
  { id: 35, title: 'Комедии' },
  { id: 80, title: 'Криминал' },
  { id: 99, title: 'Документальный' },
  { id: 18, title: 'Драма' },
  { id: 10751, title: 'Семейные' },
  { id: 14, title: 'Фэнтези' },
  { id: 36, title: 'Исторические' },
  { id: 27, title: 'Ужасы' },
  { id: 10749, title: 'Мелодрама' },
  { id: 878, title: 'Научная фантастика' },
  { id: 10770, title: 'Телевизионный фильм' },
  { id: 53, title: 'Триллеры' },
  { id: 10752, title: 'Военные' },
  { id: 37, title: 'Вестерны' }
]

export const GENRES_MAP: Record<number, string> = {
  28: 'Боевик',
  12: 'Приключения',
  16: 'Анимация',
  35: 'Комедия',
  80: 'Криминал',
  99: 'Документальный',
  18: 'Драма',
  10751: 'Семейный',
  14: 'Фэнтези',
  36: 'Исторический',
  27: 'Ужасы',
  10402: 'Музыка',
  9648: 'Мистика',
  10749: 'Мелодрама',
  878: 'Научная фантастика',
  10770: 'Телевизионный фильм',
  53: 'Триллер',
  10752: 'Военный',
  37: 'Вестерн'
}

export const COUNTRIES_LIST: { label: string; code: string }[] = [
  { label: 'США', code: 'en' },
  { label: 'Великобритания', code: 'gb' },
  { label: 'Франция', code: 'fr' },
  { label: 'Германия', code: 'de' },
  { label: 'Япония', code: 'jp' },
  { label: 'Китай', code: 'cn' },
  { label: 'Индия', code: 'in' },
  { label: 'Россия', code: 'ru' }
]
