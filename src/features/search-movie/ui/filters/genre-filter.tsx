import { MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { GENRES_LIST } from '@/shared/constants'

interface IGenreFilterProps {
  value: number | ''
  onChange: (value: number | '') => void
}

const labelStyles = {
  color: 'secondary.contrastText',
  top: '50%',
  transform: 'translate(14px, -50%)',
  '&.Mui-focused': {
    color: 'secondary.contrastText',
    top: '0',
    transform: 'translate(14px, -50%) scale(0.75)'
  },
  '&.MuiInputLabel-shrink': {
    color: 'secondary.contrastText',
    top: '0',
    transform: 'translate(14px, -50%) scale(0.75)'
  }
}

const selectStyles = {
  color: 'secondary.contrastText',
  backgroundColor: 'background.paper',
  '.MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'secondary.contrastText',
    color: 'secondary.contrastText'
  },
  height: '40px'
}
const menuItemStyles = { color: 'secondary.contrastText' }

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
