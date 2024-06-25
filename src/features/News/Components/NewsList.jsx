import { Delete, Edit } from '@mui/icons-material'
import Box from '@mui/material/Box'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'

export function NewsList({
  params,
  data,
  pagination,
  loading,
  onPaginationModelChange,
  onEdit,
  onRemove,
}) {
  const rows = data?.map((item, idx) => ({
    key: idx + 1,
    ...item,
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
      headerName: 'Image',
      width: 200,
      renderCell: ({ row }) => {
        return (
          <>
            <Box width="100%" component="img" alt="img" src={row.imageUrl} />
          </>
        )
      },
    },
    {
      field: 'author',
      headerName: 'Author',
      flex: 1,
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
    },
    {
      field: 'shortDescription',
      headerName: 'Short Description',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: '',
      type: 'actions',
      renderCell: ({ row }) => {
        return (
          <>
            <GridActionsCellItem
              icon={<Edit />}
              label="Edit"
              color="success"
              onClick={() => onEdit?.(row)}
            />
            <GridActionsCellItem
              icon={<Delete />}
              label="remove"
              color="error"
              onClick={() => onRemove?.(row)}
            />
          </>
        )
      },
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
        height: 608,

        '.MuiDataGrid-root': {
          borderRadius: 0,

          border: 0,

          '.MuiDataGrid-columnHeader': {
            bgcolor: 'grey.200',
          },
          '.MuiDataGrid-scrollbarFiller': {
            bgcolor: 'grey.200',
          },
        },
      }}
    >
      <DataGrid
        loading={loading}
        rows={rows}
        columns={columns}
        pagination={true}
        rowHeight={100}
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
