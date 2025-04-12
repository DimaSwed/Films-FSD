import { Box, Container, Typography } from '@mui/material'

export function App() {
  return (
    <Box maxWidth="100%" minHeight="100vh" p={4} sx={{ backgroundColor: 'background.paper' }}>
      <Container maxWidth="md">
        <Typography variant="h2" align="center" gutterBottom color="primary">
          Film SPA
        </Typography>
      </Container>
    </Box>
  )
}
