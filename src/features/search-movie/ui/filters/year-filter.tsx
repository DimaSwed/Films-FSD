import { MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { YEARS_LIST } from '@/shared/constants'

interface IYearFilterProps {
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
