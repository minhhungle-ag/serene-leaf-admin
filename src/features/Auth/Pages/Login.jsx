import { Box, Container, Stack, Typography } from '@mui/material'
import { LoginForm } from '../Components/LoginForm'

export const Login = () => {
  return (
    <Stack justifyContent="center" alignItems="center" width="100%" height="100vh">
      <Container maxWidth="sm">
        <Box borderRadius="4px" boxShadow={3}>
          <Stack>
            <Box sx={{ py: 3 }}>
              <Typography variant="h4" fontWeight={600} textAlign="center">
                Login
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <LoginForm />
            </Box>
          </Stack>
        </Box>
      </Container>
    </Stack>
  )
}
