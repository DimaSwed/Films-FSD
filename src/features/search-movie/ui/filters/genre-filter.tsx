import { MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { GENRES_LIST } from '@/shared/constants/constants'

interface IGenreFilterProps {
  value: number | ''
  onChange: (value: number | '') => void
}

export const GenreFilter = ({ value, onChange }: IGenreFilterProps) => (
  <FormControl sx={{ maxWidth: '150px', width: '100%' }}>
    <InputLabel sx={labelStyles}>Жанр</InputLabel>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as number | '')}
      label="Выберите жанр"
      sx={selectStyles}
    >
      <MenuItem sx={menuItemStyles} value="">
        Все жанры
      </MenuItem>
      {GENRES_LIST.map((genre) => (
        <MenuItem sx={menuItemStyles} key={genre.id} value={genre.id}>
          {genre.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

const labelStyles = {
  color: 'secondary.contrastText',
  '&.Mui-focused': { color: 'secondary.contrastText' },
  '&.MuiInputLabel-shrink': { color: 'secondary.contrastText' }
}

const selectStyles = {
  color: 'secondary.contrastText',
  backgroundColor: 'background.paper',
  '.MuiOutlinedInput-notchedOutline': { borderColor: '#444' }
}

const menuItemStyles = { color: 'secondary.contrastText' }
