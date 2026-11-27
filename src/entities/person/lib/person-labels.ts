/** Отделы TMDB → название направления в фильмографии. `Acting` зависит от пола — см. `getDepartmentLabel`. */
const DEPARTMENTS: Record<string, string> = {
  Directing: 'Режиссёр',
  Writing: 'Сценарист',
  Production: 'Продюсер',
  Sound: 'Музыка и звук',
  Camera: 'Оператор',
  Editing: 'Монтаж',
  Art: 'Художник',
  'Costume & Make-Up': 'Костюмы и грим',
  'Visual Effects': 'Визуальные эффекты',
  Lighting: 'Свет',
  Crew: 'Съёмочная группа',
  Creator: 'Автор идеи'
}

export const ACTING_DEPARTMENT = 'Acting'

/** TMDB: 1 — женский пол. */
const FEMALE = 1

export const getDepartmentLabel = (department: string, gender: number): string =>
  department === ACTING_DEPARTMENT
    ? gender === FEMALE
      ? 'Актриса'
      : 'Актёр'
    : (DEPARTMENTS[department] ?? department)

/** Частые должности. Неизвестную не показываем: английское слово в русском тексте хуже пропуска. */
const JOBS: Record<string, string> = {
  Director: 'режиссёр',
  'Co-Director': 'сорежиссёр',
  'Assistant Director': 'ассистент режиссёра',
  'First Assistant Director': 'первый ассистент режиссёра',
  Screenplay: 'сценарий',
  Writer: 'сценарист',
  Story: 'автор сюжета',
  'Original Story': 'автор сюжета',
  Novel: 'автор романа',
  Book: 'автор книги',
  Characters: 'автор персонажей',
  Producer: 'продюсер',
  'Executive Producer': 'исполнительный продюсер',
  'Co-Producer': 'сопродюсер',
  'Associate Producer': 'ассоциированный продюсер',
  'Original Music Composer': 'композитор',
  Music: 'музыка',
  Songs: 'песни',
  'Director of Photography': 'оператор-постановщик',
  Editor: 'монтажёр',
  'Production Design': 'художник-постановщик',
  'Costume Design': 'художник по костюмам',
  Casting: 'кастинг',
  Stunts: 'каскадёр',
  Thanks: 'благодарность'
}

export const getJobLabel = (job: string): string | null => JOBS[job] ?? null

/**
 * Служебные слова, которые TMDB пишет по-английски даже на `ru-RU` (замер 2026-11-26:
 * «Self - Narrator (voice)»). Имена персонажей не трогаем — их TMDB обычно не переводит.
 */
const CHARACTER_WORDS: [RegExp, string][] = [
  [/^(self|himself|herself|themselves)(?=$|\s)/i, 'играет себя'],
  [/\s+-\s+(?=narrator\b)/i, ', '],
  [/\bnarrator\b/i, 'рассказчик'],
  [/\(voice\)/gi, '(голос)'],
  [/\(uncredited\)/gi, '(без указания в титрах)'],
  [/\(archive footage\)/gi, '(архивные кадры)']
]

/** Персонаж; служебные слова TMDB («Self», «Narrator», «(voice)») переводятся. */
export const getCharacterLabel = (character = ''): string =>
  CHARACTER_WORDS.reduce((text, [pattern, word]) => text.replace(pattern, word), character.trim())
