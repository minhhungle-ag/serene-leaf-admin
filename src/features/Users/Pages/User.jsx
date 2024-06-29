import { Box, Breadcrumbs, Container, Divider, Link, Stack, Typography } from '@mui/material'
import { authApi } from 'api/authApi'
import { useCallback, useEffect, useState } from 'react'
import { UserFilter } from '../Components/UserFilter'
import { UserList } from '../Components/UserList'

export default function Users() {
  const [userList, setUserList] = useState([])
  const [loading, setLoading] = useState(false)
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  })
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 9,
  })

  const fetchData = useCallback(() => {
    setLoading(true)
    authApi
      .getAll(params)
      .then((data) => {
        setUserList(data.data.data)
        setPagination(data.data.pagination)
      })
      .catch((error) => {
        console.error(`${error}`)
      })
      .finally(() => setLoading(false))
  }, [params])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  function handleFilterChange(newParams) {
    setParams(newParams)
  }

  return (
    <Box>
      <Container>
        <Stack spacing={3}>
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  Users
                </Typography>

                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" href="/dashboard">
                    Dashboard
                  </Link>

                  <Link
                    underline="hover"
                    color="text.primary"
                    href="/dashboard/users"
                    aria-current="page"
                  >
                    Users
                  </Link>
                </Breadcrumbs>
              </Box>
            </Stack>
          </Box>

          <Box boxShadow={3} sx={{ borderRadius: '8px' }}>
            <Box width="100%">
              <UserFilter onFilterChange={handleFilterChange} params={params} />
            </Box>

            <Divider />

            <Box>
              <UserList
                data={userList || []}
                loading={loading}
                params={params}
                pagination={pagination}
                onPaginationModelChange={handleFilterChange}
              />
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
