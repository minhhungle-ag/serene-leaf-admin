import { Box, Stack } from '@mui/material'
import { NavBar } from '../Common/NavBar'

export const MainLayout = ({ children }) => {
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
