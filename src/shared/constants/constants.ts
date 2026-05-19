import { YearLists } from '@/shared/types/common.types'

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
  '2025',
  '2026'
]

// Массив жанров
export const GENRES_LIST: { id: number; name: string }[] = [
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
