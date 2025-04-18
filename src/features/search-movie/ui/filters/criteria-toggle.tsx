import { ToggleButton, ToggleButtonGroup } from '@mui/material'

interface ICriteriaToggleProps {
  value: string
  onChange: (value: string) => void
}

const buttonStyles = {
  color: 'secondary.contrastText',
  backgroundColor: 'background.paper',
  border: '1px solid #444',
  height: '40px',
  '&.Mui-selected': {
    color: 'text.primary',
    backgroundColor: 'primary.dark'
  },
  '&:hover': {
    backgroundColor: 'primary.light'
  }
}

export const CriteriaToggle = ({ value, onChange }: ICriteriaToggleProps) => (
  <ToggleButtonGroup
    value={value}
    exclusive
    onChange={(_e, newValue) => onChange(newValue)}
    aria-label="additional criteria"
    sx={{
      '.MuiToggleButton-root': buttonStyles
    }}
  >
    <ToggleButton value="new">Новое</ToggleButton>
    <ToggleButton value="highRating">Высокий рейтинг</ToggleButton>
    <ToggleButton value="best">Лучшее</ToggleButton>
  </ToggleButtonGroup>
)
