import { Stack } from '@mui/material'
import { Box } from '@mui/system'
import { FC, ReactNode, useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

import { IMovie } from '@/shared/lib'
import { InfiniteScrollFooter } from '@/shared/ui'

import { getReleaseDateRange } from '../lib'
import {
  useMoviesByFilters,
  useInfiniteSearchMovies,
  CRITERIA_MAP,
  RECOMMENDATION_MAP
} from '../model'

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
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedGenre, setSelectedGenre] = useState<number | ''>('')
  const [selectedRecommendation, setSelectedRecommendation] = useState<string>('recommendations')
  const [additionalCriteria, setAdditionalCriteria] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('popularity.desc')

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)

  const isTextSearch = !!debouncedSearchQuery

  const searchResultsQuery = useInfiniteSearchMovies(debouncedSearchQuery)
  const filtersQuery = useMoviesByFilters(
    {
      with_genres: selectedGenre,
      sort_by: sortBy,
      with_origin_country: selectedCountry,
      ...getReleaseDateRange(selectedYear)
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

  useEffect(() => {
    if (selectedRecommendation) {
      setSortBy(RECOMMENDATION_MAP[selectedRecommendation])
    }
  }, [selectedRecommendation])

  return (
    <Box sx={containerStyles}>
      <SearchInput value={searchQuery} onChange={setSearchQuery} />

      <Stack sx={filtersStackStyles}>
        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
          <RecommendationFilter
            value={selectedRecommendation}
            onChange={setSelectedRecommendation}
          />
          <GenreFilter value={selectedGenre} onChange={setSelectedGenre} />
        </Box>

        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
          <CountryFilter value={selectedCountry} onChange={setSelectedCountry} />
          <YearFilter value={selectedYear} onChange={setSelectedYear} />
        </Box>

        <CriteriaToggle
          value={additionalCriteria[0] || ''}
          onChange={(newValue) => {
            if (newValue) {
              setSortBy(CRITERIA_MAP[newValue])
              setAdditionalCriteria([newValue])
            } else {
              setAdditionalCriteria([])
              setSortBy(RECOMMENDATION_MAP[selectedRecommendation])
            }
          }}
        />
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
