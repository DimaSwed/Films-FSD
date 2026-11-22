export interface IWatchProvider {
  provider_id: number
  provider_name: string
  logo_path: string
  display_priority?: number
}

/** Сырой ответ TMDB для одного региона. */
export interface IWatchProvidersRegionRaw {
  link?: string
  flatrate?: IWatchProvider[]
  free?: IWatchProvider[]
  ads?: IWatchProvider[]
  rent?: IWatchProvider[]
  buy?: IWatchProvider[]
}

export interface IWatchProvidersResponse {
  id: number
  results?: Record<string, IWatchProvidersRegionRaw | undefined>
}

/** Где смотреть фильм в РФ: группы провайдеров и ссылка на страницу «Где смотреть» на TMDB. */
export interface IWatchProviders {
  /** Подписка */
  flatrate: IWatchProvider[]
  /** Бесплатно (в том числе с рекламой) */
  free: IWatchProvider[]
  /** Аренда */
  rent: IWatchProvider[]
  /** Покупка */
  buy: IWatchProvider[]
  /** Страница фильма с вариантами просмотра на themoviedb.org; `null`, если для региона данных нет */
  link: string | null
}
