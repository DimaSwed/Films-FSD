import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import { Box, IconButton, InputAdornment, MenuItem, TextField } from '@mui/material'
import { FC } from 'react'

import { IMovieSortOption, MOVIE_SORT_OPTIONS, TMovieSort } from '../../lib'

interface IMovieListToolbarProps {
  query: string
  sort: TMovieSort
  sortOptions?: readonly IMovieSortOption[]
  onQueryChange: (query: string) => void
  onSortChange: (sort: TMovieSort) => void
}

const fieldSx = {
  backgroundColor: 'background.paper',
  '& .MuiInputBase-root': { color: 'secondary.contrastText', height: 40 },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'secondary.contrastText' },
  '& .MuiInputLabel-root': { color: 'text.secondary' },
  // Прячем встроенный крестик браузера: у нас есть свой.
  '& input[type="search"]::-webkit-search-cancel-button': { display: 'none' }
}

/** Поле поиска по названию и выбор сортировки. Само ничего не хранит — всё приходит через пропсы. */
export const MovieListToolbar: FC<IMovieListToolbarProps> = ({
  query,
  sort,
  sortOptions = MOVIE_SORT_OPTIONS,
  onQueryChange,
  onSortChange
}) => (
  <Box
    display="flex"
    justifyContent="center"
    gap={{ xs: 1.5, sm: 2 }}
    mb={{ xs: 1.5, sm: 2 }}
    sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
  >
    <TextField
      value={query}
      onChange={(event) => onQueryChange(event.target.value)}
      placeholder="Поиск по названию"
      type="search"
      sx={{ ...fieldSx, flex: { sm: '0 1 320px' } }}
      slotProps={{
        htmlInput: { 'aria-label': 'Поиск по названию в списке' },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                aria-label="Очистить поиск"
                onClick={() => onQueryChange('')}
                edge="end"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          )
        }
      }}
    />

    <TextField
      select
      value={sort}
      onChange={(event) => onSortChange(event.target.value as TMovieSort)}
      sx={{ ...fieldSx, minWidth: { sm: 260 } }}
      slotProps={{ select: { SelectDisplayProps: { 'aria-label': 'Сортировка списка' } } }}
    >
      {sortOptions.map((option) => (
        <MenuItem key={option.value} value={option.value} sx={{ color: 'secondary.contrastText' }}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  </Box>
)
