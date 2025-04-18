import { FC, useState, useMemo, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { Stack } from '@mui/material'
import {
  SearchInput,
  GenreFilter,
  CountryFilter,
  YearFilter,
  RecommendationFilter,
  CriteriaToggle,
  MoviesGrid
} from '@/features/search-movie/ui'
import { Box } from '@mui/system'
import {
  useMoviesByFilters,
  useSearchMovies
} from '@/features/search-movie/hooks/use-search-movies'
import { CRITERIA_MAP, RECOMMENDATION_MAP } from '@/features/search-movie/types/search.types'

export const SearchFilters: FC = () => {
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

      <MoviesGrid movies={moviesToDisplay} isLoading={isSearching || moviesLoading} />
    </Box>
  )
}

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
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
  bgcolor: 'background.paper',
  // width: '100%',
  // width: '100%',
  // maxWidth: '900px',
  mb: { xs: 0, sm: 2 }
}
