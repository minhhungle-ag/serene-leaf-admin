import { Add } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { productApi } from 'api/productApi'
import { useSnackbar } from 'notistack'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AddEditProductForm } from '../Components/AddEditProductForm'
import { ProductFilter } from '../Components/ProductFilter'
import { ProductList } from '../Components/ProductList'

export default function Products() {
  const [productList, setProductList] = useState([])
  const [showAddEditProductForm, setShowAddEditProductForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  })
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 9,
  })

  const { enqueueSnackbar } = useSnackbar()
  const ref = useRef(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    productApi
      .getAll(params)
      .then((data) => {
        setProductList(data.data.data)
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

  function handleAddProduct() {
    setSelectedProduct(null)
    setShowAddEditProductForm(true)
  }

  function handleFilterChange(newParams) {
    setParams(newParams)
  }

  function handleCancel() {
    setSelectedProduct(null)
    setShowAddEditProductForm(false)
  }

  function handleRejectConfirm() {
    setSelectedProduct(null)
    setShowConfirm(false)
  }

  function handleResolveConfirm() {
    if (!selectedProduct) return
    setLoading(true)
    productApi
      .remove(selectedProduct.id)
      .then(() => {
        fetchData()
        enqueueSnackbar(`Remove  ${selectedProduct.title} successfully!`, { variant: 'success' })
        setShowConfirm(false)
      })
      .catch()
      .finally(() => setLoading(false))
  }

  function handleRemove(row) {
    setSelectedProduct(row)
    setShowConfirm(true)
  }

  function handleEdit(row) {
    setSelectedProduct(row)
    setShowAddEditProductForm(true)
  }

  function handleFormSubmit(formData) {
    setLoading(true)
    if (selectedProduct) {
      productApi
        .edit(selectedProduct.id, formData)
        .then(() => {
          fetchData()
          enqueueSnackbar('Edit successfully!', { variant: 'success' })
          setShowAddEditProductForm(false)
          setSelectedProduct(null)
        })
        .catch((error) => console.log(`${error}`))
        .finally(() => setLoading(false))

      return
    }

    productApi
      .add(formData)
      .then((data) => {
        fetchData()
        enqueueSnackbar('Add successfully!', { variant: 'success' })
        setShowAddEditProductForm(false)
        setSelectedProduct(null)
      })
      .catch((error) => console.log(`${error}`))
      .finally(() => setLoading(false))
  }

  return (
    <Box>
      <Container>
        <Stack spacing={3}>
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  Products
                </Typography>

                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" href="/dashboard">
                    Dashboard
                  </Link>

                  <Link
                    underline="hover"
                    color="text.primary"
                    href="/dashboard/products"
                    aria-current="page"
                  >
                    Products
                  </Link>
                </Breadcrumbs>
              </Box>
              <Button variant="contained" startIcon={<Add />} onClick={handleAddProduct}>
                Add product
              </Button>
            </Stack>
          </Box>

          <Box boxShadow={3} sx={{ borderRadius: '8px' }}>
            <Box width="100%">
              <ProductFilter onFilterChange={handleFilterChange} params={params} />
            </Box>

            <Divider />

            <Box>
              <ProductList
                data={productList || []}
                loading={loading}
                params={params}
                pagination={pagination}
                onPaginationModelChange={handleFilterChange}
                onRemove={handleRemove}
                onEdit={handleEdit}
              />
            </Box>
          </Box>
        </Stack>
      </Container>

      <Dialog fullWidth maxWidth="sm" open={showAddEditProductForm}>
        <DialogTitle>
          <Typography fontWeight={600}>Add - Edit Product</Typography>
        </DialogTitle>

        <DialogContent dividers>
          <AddEditProductForm
            ref={ref}
            data={selectedProduct}
            loading={loading}
            onSubmit={handleFormSubmit}
          />
        </DialogContent>

        <DialogActions>
          <Stack spacing={2} width="100%" sx={{ p: 2 }}>
            <LoadingButton
              fullWidth
              variant="contained"
              loading={loading}
              onClick={() => {
                const target = ref.current
                target?.submit()
              }}
            >
              Submit
            </LoadingButton>

            <LoadingButton fullWidth variant="outlined" loading={loading} onClick={handleCancel}>
              Cancel
            </LoadingButton>
          </Stack>
        </DialogActions>
      </Dialog>

      <Dialog fullWidth maxWidth="xs" open={showConfirm}>
        <DialogTitle>
          <Typography fontWeight={600}>Add - Edit News</Typography>
        </DialogTitle>

        <DialogContent dividers>
          <Typography>
            Are you sure to remove <strong>{selectedProduct?.name}?</strong>
          </Typography>
        </DialogContent>

        <DialogActions>
          <Stack spacing={2} width="100%" sx={{ p: 2 }}>
            <LoadingButton
              fullWidth
              variant="contained"
              loading={loading}
              onClick={handleResolveConfirm}
            >
              Confirm
            </LoadingButton>

            <LoadingButton
              fullWidth
              variant="outlined"
              loading={loading}
              onClick={handleRejectConfirm}
            >
              Cancel
            </LoadingButton>
          </Stack>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
