import { Add } from '@mui/icons-material'
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
import { postApi } from 'api/postApi'
import { useSnackbar } from 'notistack'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AddEditNewsForm } from '../Components/AddEditNewsForm'
import { NewsFilter } from '../Components/NewsFilter'
import { NewsList } from '../Components/NewsList'
import { LoadingButton } from '@mui/lab'

export default function News() {
  const [newsList, setNewsList] = useState([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [showAddEditNews, setShowAddEditNews] = useState(false)
  const [news, setNews] = useState(null)
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

  const { enqueueSnackbar } = useSnackbar()
  const ref = useRef(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    postApi
      .getAll(params)
      .then((data) => {
        setNewsList(data.data.data)
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

  function handleCancel() {
    setShowAddEditNews(false)
    setNews(null)
  }

  function handleAddNews() {
    setShowAddEditNews(false)
    setShowAddEditNews(true)
  }

  function handleEdit(row) {
    setNews(row)
    setShowAddEditNews(true)
  }

  function handleResolveConfirm() {
    if (!news) return
    setLoading(true)
    postApi
      .remove(news.id)
      .then(() => {
        fetchData()
        enqueueSnackbar(`Remove  ${news.title} successfully!`, { variant: 'success' })
        setShowConfirm(false)
      })
      .catch()
      .finally(() => setLoading(false))
  }

  function handleRemove(row) {
    setNews(row)
    setShowConfirm(true)
  }

  function handleRejectConfirm() {
    setNews(null)
    setShowConfirm(false)
  }

  function handleFormSubmit(formData) {
    setLoading(true)
    if (news) {
      postApi
        .edit(news.id, formData)
        .then(() => {
          fetchData()
          enqueueSnackbar('Edit successfully!', { variant: 'success' })
          setShowAddEditNews(false)
          setNews(null)
        })
        .catch((error) => console.log(`${error}`))
        .finally(() => setLoading(false))

      return
    }

    postApi
      .add(formData)
      .then((data) => {
        fetchData()
        enqueueSnackbar('Add successfully!', { variant: 'success' })
        setShowAddEditNews(false)
        setNews(null)
      })
      .catch((error) => console.log(`${error}`))
      .finally(() => setLoading(false))
  }

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
                  News
                </Typography>

                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" href="/dashboard">
                    Dashboard
                  </Link>

                  <Link
                    underline="hover"
                    color="text.primary"
                    href="/dashboard/news"
                    aria-current="page"
                  >
                    News
                  </Link>
                </Breadcrumbs>
              </Box>
              <Button variant="contained" startIcon={<Add />} onClick={handleAddNews}>
                Add news
              </Button>
            </Stack>
          </Box>

          <Box boxShadow={3} sx={{ borderRadius: '8px' }}>
            <Box width="100%">
              <NewsFilter params={params} onFilterChange={handleFilterChange} />
            </Box>

            <Divider />

            <Box>
              <NewsList
                onEdit={handleEdit}
                onRemove={handleRemove}
                data={newsList || []}
                loading={loading}
                params={params}
                pagination={pagination}
                onPaginationModelChange={handleFilterChange}
              />
            </Box>
          </Box>

          <Dialog fullWidth maxWidth="sm" open={showAddEditNews}>
            <DialogTitle>
              <Typography fontWeight={600}>Add - Edit News</Typography>
            </DialogTitle>

            <DialogContent dividers>
              <AddEditNewsForm
                ref={ref}
                onCancel={handleCancel}
                onSubmit={handleFormSubmit}
                data={news}
                loading={loading}
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

                <LoadingButton
                  fullWidth
                  variant="outlined"
                  loading={loading}
                  onClick={handleCancel}
                >
                  Cancel
                </LoadingButton>
              </Stack>
            </DialogActions>
          </Dialog>

          <Dialog fullWidth maxWidth="sm" open={showConfirm}>
            <DialogTitle>
              <Typography fontWeight={600}>Add - Edit News</Typography>
            </DialogTitle>

            <DialogContent dividers>
              <Typography>
                Are you sure to remove <strong>{news?.title}?</strong>
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
        </Stack>
      </Container>
    </Box>
  )
}
