import { Stack } from '@mui/material'
import { Box } from '@mui/system'
import { FC, ReactNode } from 'react'
import { useDebounce } from 'use-debounce'

import { IMovie } from '@/shared/lib'
import { InfiniteScrollFooter } from '@/shared/ui'

import { getReleaseDateRange } from '../lib'
import { useInfiniteSearchMovies, useMoviesByFilters, useSearchView } from '../model'

import {
  GenreFilter,
  CountryFilter,
  YearFilter,
  RecommendationFilter,
  CriteriaToggle
} from './filters'
import { MoviesGrid } from './movies-grid'
import { SearchInput } from './search-input'

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
  bgcolor: 'background.paper',
  p: 2
}

const filtersStackStyles = {
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
  bgcolor: 'background.paper',
  width: { md: '100%', sx: 'auto' },
  maxWidth: '950px',
  mb: { xs: 0, sm: 2 }
}

interface ISearchFiltersProps {
  renderMovieActions?: (movie: IMovie) => ReactNode
}

export const SearchFilters: FC<ISearchFiltersProps> = ({ renderMovieActions }) => {
  const { view, setQuery, setGenre, setCountry, setYear, setRecommendation, setCriteria } =
    useSearchView()

  const [debouncedSearchQuery] = useDebounce(view.query, 500)

  const isTextSearch = !!debouncedSearchQuery

  const searchResultsQuery = useInfiniteSearchMovies(debouncedSearchQuery)
  const filtersQuery = useMoviesByFilters(
    {
      with_genres: view.genre,
      sort_by: view.sortBy,
      with_origin_country: view.country,
      ...getReleaseDateRange(view.year)
    },
    // Фильтры не применяются к поиску по названию — лишний запрос не нужен.
    { enabled: !isTextSearch }
  )

  const {
    data: moviesToDisplay = [],
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = isTextSearch ? searchResultsQuery : filtersQuery

  return (
    <Box sx={containerStyles}>
      <SearchInput value={view.query} onChange={setQuery} />

      <Stack sx={filtersStackStyles}>
        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
          <RecommendationFilter value={view.recommendation} onChange={setRecommendation} />
          <GenreFilter value={view.genre} onChange={setGenre} />
        </Box>

        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
          <CountryFilter value={view.country} onChange={setCountry} />
          <YearFilter value={view.year} onChange={setYear} />
        </Box>

        <CriteriaToggle value={view.criteria} onChange={setCriteria} />
      </Stack>

      <MoviesGrid
        movies={moviesToDisplay}
        isLoading={isLoading}
        renderActions={renderMovieActions}
      />

      {moviesToDisplay.length > 0 && (
        <InfiniteScrollFooter
          loadedCount={moviesToDisplay.length}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isError={isError}
          onLoadMore={fetchNextPage}
        />
      )}
    </Box>
  )
}
