import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import { Box, Button, MenuItem, Select, SelectChangeEvent } from '@mui/material'

import { GENRES_LIST, YEARS_LIST } from '@/shared/config'

interface IFiltersProps {
  selectedGenre: string
  selectedYear: string
  /** Изменён ли хоть один фильтр. На телефоне без этого кнопка сброса скрыта. */
  hasActiveFilters: boolean
  onGenreChange: (event: SelectChangeEvent<string>) => void
  onYearChange: (event: SelectChangeEvent<string>) => void
  onResetFilters: () => void
}

const selectSx = {
  // На телефоне жанр и год стоят в одной строке и занимают её поровну
  flex: { xs: '1 1 0', sm: '0 1 auto' },
  minWidth: 0,
  color: 'secondary.contrastText',
  backgroundColor: 'background.paper',
  '.MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'secondary.contrastText',
    color: 'secondary.contrastText'
  },
  // На узком экране отступ под стрелку слишком большой, и текст не помещается. Класс повторён три раза,
  // чтобы наш стиль оказался важнее стиля MUI.
  '& .MuiSelect-select.MuiSelect-select.MuiSelect-select': {
    fontSize: { xs: '15px', sm: '16px' },
    pl: { xs: '10px', sm: '14px' },
    pr: { xs: '24px', sm: '32px' }
  },
  '& .MuiSelect-icon': { right: { xs: '2px', sm: '7px' } },
  height: '40px'
}

const itemSx = { color: 'secondary.contrastText' }

export const WatchListFilters = ({
  selectedGenre,
  selectedYear,
  hasActiveFilters,
  onGenreChange,
  onYearChange,
  onResetFilters
}: IFiltersProps) => (
  <Box display="flex" justifyContent="center" gap={{ xs: 1, sm: 2 }} mb={{ xs: 2, sm: 3 }}>
    <Select
      value={selectedGenre}
      onChange={onGenreChange}
      displayEmpty
      SelectDisplayProps={{ 'aria-label': 'Жанр' }}
      sx={selectSx}
    >
      <MenuItem value="" sx={itemSx}>
        Все жанры
      </MenuItem>
      {GENRES_LIST.map((genre) => (
        <MenuItem key={genre.id} value={genre.name} sx={itemSx}>
          {genre.name}
        </MenuItem>
      ))}
    </Select>

    <Select
      value={selectedYear}
      onChange={onYearChange}
      displayEmpty
      SelectDisplayProps={{ 'aria-label': 'Год' }}
      sx={selectSx}
    >
      <MenuItem value="" sx={itemSx}>
        Все годы
      </MenuItem>
      {YEARS_LIST.map((year) => (
        <MenuItem key={year} value={year} sx={itemSx}>
          {year}
        </MenuItem>
      ))}
    </Select>

    <Button
      variant="contained"
      color="primary"
      aria-label="Сбросить фильтры"
      onClick={onResetFilters}
      sx={{
        display: { xs: hasActiveFilters ? 'inline-flex' : 'none', sm: 'inline-flex' },
        flexShrink: 0,
        height: '40px',
        minWidth: { xs: 44, sm: 64 },
        px: { xs: 0, sm: 2 }
      }}
    >
      <FilterAltOffIcon fontSize="small" sx={{ display: { sm: 'none' } }} />
      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
        Сбросить фильтры
      </Box>
    </Button>
  </Box>
)
