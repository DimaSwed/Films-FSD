import { MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { COUNTRIES_LIST } from '@/shared/constants'

interface ICountryFilterProps {
  value: string
  onChange: (value: string) => void
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

export const CountryFilter = ({ value, onChange }: ICountryFilterProps) => (
  <FormControl sx={{ maxWidth: '150px', width: '100%' }}>
    <InputLabel sx={labelStyles}>Страна</InputLabel>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as string)}
      label="Выберите страну"
      sx={selectStyles}
    >
      <MenuItem sx={menuItemStyles} value="">
        Все страны
      </MenuItem>
      {COUNTRIES_LIST.map((country) => (
        <MenuItem sx={menuItemStyles} key={country.code} value={country.code}>
          {country.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)
