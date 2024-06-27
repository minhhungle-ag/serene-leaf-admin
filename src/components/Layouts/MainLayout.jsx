import { Box, Stack, Typography } from '@mui/material'
import { NavBar } from '../Common/NavBar'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export const MainLayout = ({ children }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const divRef = useRef()
  const location = useLocation()

  useEffect(() => {
    divRef.current?.scroll({
      top: 0,
      behavior: 'smooth',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  useEffect(() => {
    if (!token) navigate('/auth/login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  if (!token) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Stack direction="row" height="100vh" overflow="hidden">
      <Box
        sx={{
          width: '280px',
          height: '100vh',
          overflow: 'auto',
          // bgcolor: 'rgb(15, 18, 20)',
          // color: 'white',
        }}
        boxShadow={3}
      >
        <Box sx={{ p: 2, height: '100%' }}>
          <NavBar />
        </Box>
      </Box>

      <Box
        ref={divRef}
        sx={{
          width: 'calc(100% - 280px)',
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Box sx={{ p: 2, height: '100%' }}>
          <Box>{children}</Box>
        </Box>
      </Box>
    </Stack>
  )
}
