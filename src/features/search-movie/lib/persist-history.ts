export const getSearchHistory = (): string[] => {
  const data = localStorage.getItem('film-search-history')
  return data ? JSON.parse(data) : []
}

export const setSearchHistory = (history: string[]) => {
  localStorage.setItem('film-search-history', JSON.stringify(history))
}
