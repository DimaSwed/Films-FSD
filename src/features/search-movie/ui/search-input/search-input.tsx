import { TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

interface ISearchInputProps {
  value: string
  onChange: (value: string) => void
}

export const SearchInput = ({ value, onChange }: ISearchInputProps) => (
  <TextField
    label="Поиск по названию"
    variant="outlined"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    InputLabelProps={{
      sx: {
        color: 'secondary.contrastText',
        '&.Mui-focused': { color: 'secondary.contrastText' },
        '&.MuiInputLabel-shrink': { color: 'secondary.contrastText' }
      }
    }}
    InputProps={{
      sx: {
        color: 'secondary.contrastText',
        backgroundColor: 'background.paper',
        '.MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'secondary.contrastText' }
      },
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon sx={{ color: 'text.primary' }} />
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={() => onChange('')}>
            <CloseIcon sx={{ color: 'text.primary' }} />
          </IconButton>
        </InputAdornment>
      )
    }}
    sx={{ width: '100%', maxWidth: '600px', mb: 1 }}
  />
)
