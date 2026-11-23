const HISTORY_KEY = 'film-search-history'

/** История запросов из `localStorage`. Битые данные и недоступное хранилище дают пустой список. */
export const getSearchHistory = (): string[] => {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : []
  } catch {
    return []
  }
}

export const setSearchHistory = (history: string[]) => {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  } catch {
    // Приватный режим или переполненное хранилище: история — удобство, не критичная функция.
  }
}
