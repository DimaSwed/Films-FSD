import { FC, useState, useMemo, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Typography,
  InputAdornment,
  IconButton
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useMoviesByFilters, useSearchMovies } from '@/features/search-movie/'
import { SmallMovieCard } from '@/entities/movie/'
import { GENRES_LIST, YEARS_LIST, COUNTRIES_LIST } from '@/shared/constants/constants'
import { IMovie } from '@/shared/types/common.types'
import { CRITERIA_MAP, RECOMMENDATION_MAP } from '@/features/search-movie/types/search.types'

export const SearchFilters: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedGenre, setSelectedGenre] = useState<number | ''>('')
  const [selectedRecommendation, setSelectedRecommendation] = useState<string>('recommendations')
  const [additionalCriteria, setAdditionalCriteria] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('popularity.desc')

  // Дебаунс для поискового запроса
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)

  const { data: searchResults, isLoading: isSearching } = useSearchMovies(debouncedSearchQuery)
  const { data: filteredMovies, isLoading: moviesLoading } = useMoviesByFilters({
    with_genres: selectedGenre,
    sort_by: sortBy,
    with_original_language: selectedCountry,
    primary_release_year: selectedYear,
    'primary_release_date.lte': new Date().toISOString().split('T')[0]
  })

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleGenreChange = (event: SelectChangeEvent<number | ''>) => {
    setSelectedGenre(event.target.value as number | '')
  }

  const handleRecommendationChange = (event: SelectChangeEvent<string>) => {
    setSelectedRecommendation(event.target.value)
  }

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCountry(event.target.value as string)
  }

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    setSelectedYear(event.target.value as string)
  }

  // Объединенные результаты поиска и фильтрации
  const moviesToDisplay = useMemo(() => {
    if (debouncedSearchQuery) {
      return searchResults?.docs || []
    }
    return filteredMovies || []
  }, [debouncedSearchQuery, searchResults, filteredMovies])

  const isLoading = isSearching || moviesLoading

  useEffect(() => {
    if (selectedRecommendation) {
      setSortBy(RECOMMENDATION_MAP[selectedRecommendation])
    }
  }, [selectedRecommendation])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        bgcolor: 'background.paper',
        p: 2
      }}
    >
      <TextField
        label="Поиск по названию"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        InputLabelProps={{
          sx: {
            color: 'secondary.contrastText',
            '&.Mui-focused': {
              color: 'secondary.contrastText'
            },
            '&.MuiInputLabel-shrink': {
              color: 'secondary.contrastText'
            }
          }
        }}
        InputProps={{
          sx: {
            color: 'secondary.contrastText',
            backgroundColor: 'background.paper',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#444'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'secondary.contrastText'
            }
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.primary' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setSearchQuery('')}>
                <CloseIcon sx={{ color: 'text.primary' }} />
              </IconButton>
            </InputAdornment>
          )
        }}
        sx={{
          width: '100%',
          maxWidth: '600px',
          mb: 1
        }}
      />

      <Stack
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          bgcolor: 'background.paper',
          width: '100%'
        }}
      >
        <FormControl sx={{ maxWidth: '150px', width: '100%' }}>
          <InputLabel
            sx={{
              color: 'secondary.contrastText',
              '&.Mui-focused': {
                color: 'secondary.contrastText'
              },
              '&.MuiInputLabel-shrink': {
                color: 'secondary.contrastText'
              }
            }}
          >
            Рекомендуемые
          </InputLabel>
          <Select
            value={selectedRecommendation}
            onChange={handleRecommendationChange}
            label="Рекомендуемые"
            sx={{
              color: 'secondary.contrastText',
              backgroundColor: 'background.paper',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: '#444'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'secondary.contrastText',
                color: 'secondary.contrastText'
              }
            }}
          >
            <MenuItem sx={{ color: 'secondary.contrastText' }} value="recommendations">
              Рекомендуемые
            </MenuItem>
            <MenuItem sx={{ color: 'secondary.contrastText' }} value="rating">
              По рейтингу
            </MenuItem>
            <MenuItem sx={{ color: 'secondary.contrastText' }} value="releaseDate">
              По дате выхода
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ maxWidth: '150px', width: '100%' }}>
          <InputLabel
            sx={{
              color: 'secondary.contrastText',
              '&.Mui-focused': {
                color: 'secondary.contrastText'
              },
              '&.MuiInputLabel-shrink': {
                color: 'secondary.contrastText'
              }
            }}
          >
            Жанр
          </InputLabel>
          <Select
            value={selectedGenre}
            onChange={handleGenreChange}
            label="Выберите жанр"
            sx={{
              color: 'secondary.contrastText',
              backgroundColor: 'background.paper',
              '.MuiOutlinedInput-notchedOutline': { borderColor: '#444' }
            }}
          >
            <MenuItem sx={{ color: 'secondary.contrastText' }} value="">
              Все жанры
            </MenuItem>
            {GENRES_LIST.map((genre) => (
              <MenuItem sx={{ color: 'secondary.contrastText' }} key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ maxWidth: '150px', width: '100%' }}>
          <InputLabel
            sx={{
              color: 'secondary.contrastText',
              '&.Mui-focused': {
                color: 'secondary.contrastText'
              },
              '&.MuiInputLabel-shrink': {
                color: 'secondary.contrastText'
              }
            }}
          >
            Страна
          </InputLabel>
          <Select
            value={selectedCountry}
            onChange={handleCountryChange}
            label="Выберите страну"
            sx={{
              color: 'secondary.contrastText',
              backgroundColor: 'background.paper',
              '.MuiOutlinedInput-notchedOutline': { borderColor: '#444' }
            }}
          >
            <MenuItem sx={{ color: 'secondary.contrastText' }} value="">
              Все страны
            </MenuItem>
            {COUNTRIES_LIST.map((country) => (
              <MenuItem
                sx={{ color: 'secondary.contrastText' }}
                key={country.code}
                value={country.code}
              >
                {country.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ maxWidth: '150px', width: '100%' }}>
          <InputLabel
            sx={{
              color: 'secondary.contrastText',
              '&.Mui-focused': {
                color: 'secondary.contrastText'
              },
              '&.MuiInputLabel-shrink': {
                color: 'secondary.contrastText'
              }
            }}
          >
            Год
          </InputLabel>
          <Select
            value={selectedYear}
            onChange={handleYearChange}
            label="Выберите год"
            sx={{
              color: 'secondary.contrastText',
              backgroundColor: 'background.paper',
              '.MuiOutlinedInput-notchedOutline': { borderColor: '#444' }
            }}
          >
            <MenuItem sx={{ color: 'secondary.contrastText' }} value="">
              Все годы
            </MenuItem>
            {YEARS_LIST.map((year, index) => (
              <MenuItem sx={{ color: 'secondary.contrastText' }} key={index} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ToggleButtonGroup
          value={additionalCriteria[0] || ''}
          exclusive
          onChange={(_e, newValue) => {
            if (newValue) {
              setSortBy(CRITERIA_MAP[newValue])
              setAdditionalCriteria([newValue])
            } else {
              setAdditionalCriteria([])
              setSortBy(RECOMMENDATION_MAP[selectedRecommendation])
            }
          }}
          aria-label="additional criteria"
          sx={{
            '.MuiToggleButton-root': {
              color: 'secondary.contrastText',
              backgroundColor: 'background.paper',
              border: '1px solid #444',
              // maxWidth: '160px',
              // width: '100%',
              '&.Mui-selected': {
                color: 'text.primary',
                backgroundColor: 'primary.dark'
              },
              '&:hover': {
                backgroundColor: 'primary.light'
              }
            }
          }}
        >
          <ToggleButton value="new">Новое</ToggleButton>
          <ToggleButton value="highRating">Высокий рейтинг</ToggleButton>
          <ToggleButton value="best">Лучшее</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      ) : moviesToDisplay.length === 0 ? (
        <Typography variant="h6" color="text.primary" textAlign={'center'}>
          Ничего не найдено. Попробуйте изменить параметры поиска.
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', padding: '0 10px', gap: '16px' }}>
          {moviesToDisplay.map((movie: IMovie) => (
            <Box
              key={movie.id}
              sx={{
                flex: {
                  xs: '1 1 100%',
                  sm: '1 1 calc(50% - 16px)',
                  md: '1 1 calc(33.33% - 16px)',
                  lg: '1 1 calc(25% - 16px)'
                },
                boxSizing: 'border-box'
              }}
            >
              <SmallMovieCard movie={movie} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}
