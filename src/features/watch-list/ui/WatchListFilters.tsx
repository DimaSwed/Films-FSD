import { Box, Select, MenuItem, Button, SelectChangeEvent } from '@mui/material'
import { GENRES_LIST, YEARS_LIST } from '@/shared/constants'

interface IFiltersProps {
  selectedGenre: string
  selectedYear: string
  onGenreChange: (event: SelectChangeEvent<string>) => void
  onYearChange: (event: SelectChangeEvent<string>) => void
  onResetFilters: () => void
}

export const WatchListFilters = ({
  selectedGenre,
  selectedYear,
  onGenreChange,
  onYearChange,
  onResetFilters
}: IFiltersProps) => (
  <Box
    display="flex"
    justifyContent="center"
    gap={2}
    mb={3}
    sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
  >
    <Select
      value={selectedGenre}
      onChange={onGenreChange}
      displayEmpty
      sx={{
        color: 'secondary.contrastText',
        backgroundColor: 'background.paper',
        '.MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'secondary.contrastText',
          color: 'secondary.contrastText'
        }
      }}
    >
      <MenuItem value="" sx={{ color: 'secondary.contrastText' }}>
        Все жанры
      </MenuItem>
      {GENRES_LIST.map((genre) => (
        <MenuItem key={genre.id} value={genre.name} sx={{ color: 'secondary.contrastText' }}>
          {genre.name}
        </MenuItem>
      ))}
    </Select>

    <Select
      value={selectedYear}
      onChange={onYearChange}
      displayEmpty
      sx={{
        color: 'secondary.contrastText',
        backgroundColor: 'background.paper',
        '.MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'secondary.contrastText',
          color: 'secondary.contrastText'
        }
      }}
    >
      <MenuItem value="" sx={{ color: 'secondary.contrastText' }}>
        Все годы
      </MenuItem>
      {YEARS_LIST.map((year) => (
        <MenuItem key={year} value={year} sx={{ color: 'secondary.contrastText' }}>
          {year}
        </MenuItem>
      ))}
    </Select>

    <Button variant="contained" color="primary" onClick={onResetFilters}>
      Сбросить фильтры
    </Button>
  </Box>
)
