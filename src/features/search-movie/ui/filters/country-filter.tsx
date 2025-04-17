import { MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { COUNTRIES_LIST } from '@/shared/constants'

interface ICountryFilterProps {
  value: string
  onChange: (value: string) => void
}

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
