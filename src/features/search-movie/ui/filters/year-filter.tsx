import { MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { YEARS_LIST } from '@/shared/constants/constants'

interface IYearFilterProps {
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

export const YearFilter = ({ value, onChange }: IYearFilterProps) => (
  <FormControl sx={{ maxWidth: '150px', width: '100%' }}>
    <InputLabel sx={labelStyles}>Год</InputLabel>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as string)}
      label="Выберите год"
      sx={selectStyles}
    >
      <MenuItem sx={menuItemStyles} value="">
        Все годы
      </MenuItem>
      {YEARS_LIST.map((year, index) => (
        <MenuItem sx={menuItemStyles} key={index} value={year}>
          {year}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)
