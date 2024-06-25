import GroupIcon from '@mui/icons-material/Group'
import InventoryIcon from '@mui/icons-material/Inventory'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import { Box, Button, Stack } from '@mui/material'
import logo from 'assets/images/logo.svg'
import { NavLink } from 'react-router-dom'

const navBarList = [
  {
    label: 'products',
    path: '/dashboard/products',
    icon: <InventoryIcon />,
  },
  {
    label: 'News',
    path: '/dashboard/news',
    icon: <NewspaperIcon />,
  },
  {
    label: 'Users',
    path: '/dashboard/users',
    icon: <GroupIcon />,
  },
]

export const NavBar = () => {
  return (
    <Box>
      <Box sx={{ px: 2, pb: 3 }}>
        <Box component="img" src={logo} alt="logo" />
      </Box>

      <Stack
        spacing={1}
        sx={{
          '& a': { color: 'inherit' },
          '.active': {
            '& button': {
              bgcolor: 'grey.300',
              color: 'primary.main',
            },
          },
        }}
      >
        {navBarList.map((item, idx) => (
          <Box
            key={idx}
            to={item.path}
            component={NavLink}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <Box>
              <Button
                fullWidth
                color="inherit"
                sx={{ justifyContent: 'flex-start', px: 2 }}
                startIcon={item.icon}
              >
                {item.label}
              </Button>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
