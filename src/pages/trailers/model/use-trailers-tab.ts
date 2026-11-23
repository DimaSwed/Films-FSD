import { useSearchParams } from 'react-router-dom'

import type { TMovieCategory } from '@/features/movies'

import { TRAILERS_TABS } from '../config'

const TAB_PARAM = 'list'
const DEFAULT_CATEGORY = TRAILERS_TABS[0].category

/** Открытая вкладка. Хранится в адресе, чтобы возврат со страницы фильма открывал её же. */
export const useTrailersTab = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const param = searchParams.get(TAB_PARAM)
  const category = TRAILERS_TABS.find((tab) => tab.category === param)?.category ?? DEFAULT_CATEGORY

  const setCategory = (value: TMovieCategory) =>
    setSearchParams(value === DEFAULT_CATEGORY ? {} : { [TAB_PARAM]: value }, { replace: true })

  return { category, setCategory }
}
