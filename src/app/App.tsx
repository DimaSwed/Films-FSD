import { Box, Typography } from '@mui/material'

export function App() {
  return (
    <Box width="100%" minHeight="100vh" p={4} sx={{ backgroundColor: 'background.paper' }}>
      <Typography variant="h2" align="center" gutterBottom color="primary">
        Film SPA
      </Typography>
    </Box>
  )
}
