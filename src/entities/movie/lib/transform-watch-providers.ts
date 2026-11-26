import { TMDB_REGION } from '@/shared/config'

import type {
  ICompactWatchProviderGroup,
  IWatchProvider,
  IWatchProviders,
  IWatchProvidersResponse
} from '../model'

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

/**
 * Группы для компактного вида (карточка списка): подписка, бесплатно и общая «аренда, покупка».
 * Сервис показывается один раз — в самой выгодной группе: если фильм есть в подписке Okko, то, что
 * в Okko его можно и купить, в карточке не важно. Пустые группы отброшены.
 */
export const getCompactWatchProviderGroups = (
  providers: IWatchProviders
): ICompactWatchProviderGroup[] => {
  const shown = new Set<number>()
  const takeNew = (list: IWatchProvider[]) => {
    const fresh = list.filter((provider) => !shown.has(provider.provider_id))
    fresh.forEach((provider) => shown.add(provider.provider_id))
    return fresh
  }

  const groups: ICompactWatchProviderGroup[] = [
    { key: 'flatrate', title: 'Подписка', providers: takeNew(providers.flatrate) },
    { key: 'free', title: 'Бесплатно', providers: takeNew(providers.free) },
    {
      key: 'paid',
      title: 'Аренда, покупка',
      providers: takeNew(normalizeGroup(providers.rent, providers.buy))
    }
  ]

  return groups.filter((group) => group.providers.length > 0)
}

export const hasWatchProviders = (providers: IWatchProviders): boolean =>
  providers.flatrate.length > 0 ||
  providers.free.length > 0 ||
  providers.rent.length > 0 ||
  providers.buy.length > 0
