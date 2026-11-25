import { Theme, ToggleButton, ToggleButtonGroup } from '@mui/material'

interface ICriteriaToggleProps {
  value: string
  /** `null` — нажали на уже выбранную кнопку, то есть сняли выбор. */
  onChange: (value: string | null) => void
}

const buttonStyles = {
  color: 'secondary.contrastText',
  backgroundColor: 'background.paper',
  border: (theme: Theme) => `1px solid ${theme.palette.outline.strong}`,
  height: '40px',
  lineHeight: '120%',
  '&.Mui-selected': {
    color: 'primary.contrastText',
    backgroundColor: 'primary.dark'
  },
  // На сенсорном экране наведение остаётся после нажатия, и снятый критерий выглядел бы выбранным
  '@media (hover: hover)': {
    '&:hover, &.Mui-selected:hover': {
      color: 'primary.contrastText',
      backgroundColor: 'primary.light'
    }
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
    <ToggleButton sx={{ width: { md: '162px', sx: 'auto' } }} value="highRating">
      Высокий рейтинг
    </ToggleButton>
    <ToggleButton value="best">Лучшее</ToggleButton>
  </ToggleButtonGroup>
)
