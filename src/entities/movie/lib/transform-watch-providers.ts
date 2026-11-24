import { TMDB_REGION } from '@/shared/config'

import type { IWatchProvider, IWatchProviders, IWatchProvidersResponse } from '../model'

const byPriority = (a: IWatchProvider, b: IWatchProvider) =>
  (a.display_priority ?? Number.MAX_SAFE_INTEGER) - (b.display_priority ?? Number.MAX_SAFE_INTEGER)

/** Склеивает группы, убирает повторы (провайдер может быть и в `free`, и в `ads`) и сортирует по приоритету TMDB. */
const normalizeGroup = (...groups: (IWatchProvider[] | undefined)[]): IWatchProvider[] => {
  const unique = new Map<number, IWatchProvider>()

  for (const provider of groups.flatMap((group) => group ?? [])) {
    if (!unique.has(provider.provider_id)) {
      unique.set(provider.provider_id, provider)
    }
  }

  return [...unique.values()].sort(byPriority)
}

export const transformWatchProviders = (data: IWatchProvidersResponse): IWatchProviders => {
  const region = data.results?.[TMDB_REGION]

  return {
    flatrate: normalizeGroup(region?.flatrate),
    free: normalizeGroup(region?.free, region?.ads),
    rent: normalizeGroup(region?.rent),
    buy: normalizeGroup(region?.buy),
    link: region?.link ?? null
  }
}

export const hasWatchProviders = (providers: IWatchProviders): boolean =>
  providers.flatrate.length > 0 ||
  providers.free.length > 0 ||
  providers.rent.length > 0 ||
  providers.buy.length > 0
