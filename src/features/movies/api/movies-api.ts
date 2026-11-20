import { api } from '@/shared/api'
import { IMovie, IMovieRaw, IPaginatedResponse, transformMovie } from '@/shared/lib'

import type { IMoviesFilters, TMovieCategory } from '../model'

const CATEGORY_ENDPOINTS: Record<TMovieCategory, { path: string; withRegion: boolean }> = {
  trending: { path: '/trending/movie/week', withRegion: false },
  'now-playing': { path: '/movie/now_playing', withRegion: true },
  popular: { path: '/movie/popular', withRegion: true },
  upcoming: { path: '/movie/upcoming', withRegion: true },
  'top-rated': { path: '/movie/top_rated', withRegion: true }
}

const toMoviesPage = (
  data: IPaginatedResponse<IMovieRaw> | undefined
): IPaginatedResponse<IMovie> => {
  if (!data || !data.results) {
    throw new Error('Фильмы не найдены')
  }
  return { ...data, results: data.results.map(transformMovie) }
}

const getCategoryPage = async (category: TMovieCategory, page: number) => {
  const { path, withRegion } = CATEGORY_ENDPOINTS[category]
  const response = await api.get<IPaginatedResponse<IMovieRaw>>(path, {
    params: { language: 'ru-RU', page, ...(withRegion && { region: 'RU' }) }
  })
  return toMoviesPage(response.data)
}

const getFirstPageResults = async (category: TMovieCategory): Promise<IMovie[]> =>
  (await getCategoryPage(category, 1)).results

export const moviesApi = {
  /** Страница подборки (для карусели берётся первая, для «Просмотреть все» — по странице за запрос). */
  getCategoryPage,

  getUpcoming: () => getFirstPageResults('upcoming'),
  getTopRated: () => getFirstPageResults('top-rated'),
  getTrending: () => getFirstPageResults('trending'),
  getNowPlaying: () => getFirstPageResults('now-playing'),
  getPopular: () => getFirstPageResults('popular'),

  getByFilters: async (params: IMoviesFilters, page = 1) => {
    const response = await api.get<IPaginatedResponse<IMovieRaw>>('/discover/movie', {
      params: {
        ...params,
        page,
        language: params.language || 'ru-RU',
        region: params.region || 'RU'
      }
    })
    return toMoviesPage(response.data)
  }
}
