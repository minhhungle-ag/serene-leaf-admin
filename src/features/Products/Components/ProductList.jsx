import { Delete, Edit } from '@mui/icons-material'
import { Chip, alpha } from '@mui/material'
import Box from '@mui/material/Box'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { numberToCurrencyUSD } from 'utils/common'

export function ProductList({
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
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },

    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      renderCell: ({ row }) => (
        <Box
          sx={{
            '.MuiChip-root': {
              borderRadius: '8px !important',
              width: '100%',
            },
          }}
        >
          <Chip
            size="small"
            sx={{
              fontWeight: 600,
              color: (theme) => theme.palette.info.main,
              bgcolor: (theme) => alpha(theme.palette.info.main, 0.1),
            }}
            label={row.category}
          />
        </Box>
      ),
    },
    {
      field: 'price',
      headerName: 'price',
      width: 100,
      renderCell: ({ row }) => (
        <Box
          sx={{
            '.MuiChip-root': {
              borderRadius: '8px !important',
              width: '100%',
            },
          }}
        >
          <Chip
            size="small"
            sx={{
              fontWeight: 600,
              color: (theme) => theme.palette.error.main,
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
            }}
            label={numberToCurrencyUSD(parseInt(row?.price))}
          />
        </Box>
      ),
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 100,
      align: 'center',
    },
    {
      field: 'shortDescription',
      headerName: 'Short Description',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 150,
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
