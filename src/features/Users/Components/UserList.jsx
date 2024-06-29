import { Avatar, Stack } from '@mui/material'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'

export function UserList({ params, data, pagination, loading, onPaginationModelChange }) {
  const rows = data?.map((item, idx) => ({
    key: idx + 1,
    ...item,
    imageUrl: 'https://mui.com/static/images/avatar/1.jpg',
  }))

  const columns = [
    {
      field: 'key',
      headerName: '#',
      width: 50,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => {
        return parseInt(pagination?.limit) * (parseInt(pagination?.page) - 1) + row.key
      },
    },
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'imageUrl',
      headerName: 'Avatar',
      width: 200,
      headerAlign: 'center',
      renderCell: ({ row }) => {
        return (
          <Stack justifyContent="center" alignItems="center" width="100%" height="100%">
            <Avatar sx={{ width: 80, height: 80 }} src={row.imageUrl} alt="user"></Avatar>
          </Stack>
        )
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'fullName',
      headerName: 'Name',
      flex: 1,
    },
  ]

  function handlePaginationModelChange(model) {
    const newParams = {
      ...params,
      page: model.page + 1,
      limit: model.pageSize,
    }

    onPaginationModelChange?.(newParams)
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: 708,

        '.MuiDataGrid-root': {
          borderRadius: 0,

          border: 0,

          '.MuiDataGrid-columnHeader': {
            bgcolor: 'grey.200',
          },
          '.MuiDataGrid-scrollbarFiller': {
            bgcolor: 'grey.200',
          },
          '.MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
          },
        },
      }}
    >
      <DataGrid
        loading={loading}
        rows={rows}
        columns={columns}
        pagination={true}
        rowHeight={150}
        pageSizeOptions={[5, 10, 15, 25, 50, 100]}
        disableRowSelectionOnClick
        paginationMode="server"
        rowCount={pagination?.total || 0}
        paginationModel={{
          page: params?.page - 1 || 0,
          pageSize: params?.limit || 5,
        }}
        onRowModesModelChange={(row) => console.log('row: ', row)}
        onPaginationModelChange={handlePaginationModelChange}
        disableColumnSelector
      />
    </Box>
  )
}
