import { Box, Container, Stack, Typography } from '@mui/material'
import { authApi } from 'api/authApi'
import { useSnackbar } from 'notistack'
import { Link, useNavigate } from 'react-router-dom'
import { LoginForm } from '../Components/LoginForm'
import { useEffect, useState } from 'react'

export function Login() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSubmit(formValues) {
    setLoading(true)
    authApi
      .login(formValues)
      .then((data) => {
        enqueueSnackbar('login success', { variant: 'success' })
        localStorage.setItem('token', data.data.token)
        navigate('/dashboard')
      })
      .catch((error) => {
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
      .finally(() => setLoading(false))
  }

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
              <LoginForm onSubmit={handleSubmit} loading={loading} />
            </Box>

            <Typography sx={{ p: 3 }} color="primary">
              I don't have any account.{' '}
              <Box
                component={Link}
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  textDecoration: 'none',
                }}
                to="/auth/sign-up"
              >
                Sign Up
              </Box>
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Stack>
  )
}
