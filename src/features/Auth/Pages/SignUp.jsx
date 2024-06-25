import { Box, Container, Stack, Typography } from '@mui/material'
import { SignUpForm } from '../Components/SignUpForm'

export function SignUp() {
  return (
    <Stack justifyContent="center" alignItems="center" width="100%" height="100vh">
      <Container maxWidth="sm">
        <Box borderRadius="4px" boxShadow={3}>
          <Stack>
            <Box sx={{ py: 3 }}>
              <Typography variant="h4" fontWeight={600} textAlign="center">
                Sign Up
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <SignUpForm />
            </Box>
          </Stack>
        </Box>
      </Container>
    </Stack>
  )
}
