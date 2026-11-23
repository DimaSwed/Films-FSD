/** `id` опции — на него ссылается `aria-activedescendant` поля ввода. */
export const getSearchOptionId = (listId: string, index: number) => `${listId}-option-${index}`
