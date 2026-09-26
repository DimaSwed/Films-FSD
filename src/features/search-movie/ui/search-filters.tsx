import { FC, ReactNode, useState, useMemo, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { Stack } from '@mui/material'
import { Box } from '@mui/system'
import { SearchInput } from './search-input'
import {
  GenreFilter,
  CountryFilter,
  YearFilter,
  RecommendationFilter,
  CriteriaToggle
} from './filters'
import { MoviesGrid } from './movies-grid'
import { useMoviesByFilters, useSearchMovies } from '../hooks'
import { CRITERIA_MAP, RECOMMENDATION_MAP } from '../types'
import { IMovie } from '@/shared/types'

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

  const { data: searchResults, isLoading: isSearching } = useSearchMovies(debouncedSearchQuery)
  const { data: filteredMovies, isLoading: moviesLoading } = useMoviesByFilters({
    with_genres: selectedGenre,
    sort_by: sortBy,
    with_original_language: selectedCountry,
    primary_release_year: selectedYear,
    'primary_release_date.lte': new Date().toISOString().split('T')[0]
  })

  const moviesToDisplay = useMemo(() => {
    return debouncedSearchQuery ? searchResults?.docs || [] : filteredMovies || []
  }, [debouncedSearchQuery, searchResults, filteredMovies])

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
        isLoading={isSearching || moviesLoading}
        renderActions={renderMovieActions}
      />
    </Box>
  )
}
