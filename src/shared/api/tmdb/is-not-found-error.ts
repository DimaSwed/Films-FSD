import { isAxiosError } from 'axios'

import { ITMDBError } from '../../lib'

/** Код TMDB «The resource you requested could not be found». */
const TMDB_NOT_FOUND_CODE = 34

/** Записи нет в TMDB. Сверяем и код TMDB: голый 404 может прийти от прокси, а это уже сбой. */
export const isNotFoundError = (error: unknown): boolean =>
  isAxiosError<ITMDBError>(error) &&
  error.response?.status === 404 &&
  error.response.data?.status_code === TMDB_NOT_FOUND_CODE
