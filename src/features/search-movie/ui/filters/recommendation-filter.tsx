import { MenuItem, Select, FormControl, InputLabel } from '@mui/material'

interface IRecommendationFilterProps {
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
  '.MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'secondary.contrastText',
    color: 'secondary.contrastText'
  }
}

const menuItemStyles = { color: 'secondary.contrastText' }

export const RecommendationFilter = ({ value, onChange }: IRecommendationFilterProps) => (
  <FormControl sx={{ maxWidth: '150px', width: '100%' }}>
    <InputLabel sx={labelStyles}>Рекомендуемые</InputLabel>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as string)}
      label="Рекомендуемые"
      sx={selectStyles}
    >
      <MenuItem sx={menuItemStyles} value="recommendations">
        Рекомендуемые
      </MenuItem>
      <MenuItem sx={menuItemStyles} value="rating">
        По рейтингу
      </MenuItem>
      <MenuItem sx={menuItemStyles} value="releaseDate">
        По дате выхода
      </MenuItem>
    </Select>
  </FormControl>
)
