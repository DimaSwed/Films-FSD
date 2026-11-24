import { TMDB_REGION } from '@/shared/config'

import type { ICountryReleasesRaw } from '../model'

/** Ограниченный и широкий прокат; премьеры, цифра и диски — не прокат. */
const THEATRICAL_TYPES = [2, 3]

/** Первый показ в кинотеатрах России и российская возрастная маркировка. */
export const getRussianRelease = (
  countries: ICountryReleasesRaw[] = []
): { date: string | null; ageRating: string | null } => {
  const releases =
    countries.find(({ iso_3166_1 }) => iso_3166_1 === TMDB_REGION)?.release_dates ?? []
  const [firstDate] = releases
    .filter(({ type, release_date }) => !!release_date && THEATRICAL_TYPES.includes(type))
    .map(({ release_date }) => release_date)
    .sort()

  return {
    date: firstDate ?? null,
    ageRating: releases.find(({ certification }) => certification)?.certification ?? null
  }
}
