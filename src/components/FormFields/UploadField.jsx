import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Box, Button, Stack, styled } from '@mui/material'
import { UploadIcon } from 'assets/icon/UploadIcon'
import { useSnackbar } from 'notistack'
import * as React from 'react'
import { useController } from 'react-hook-form'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export function UploadField({ name, control, imageUrl }) {
  const [review, setReview] = React.useState('')
  const { enqueueSnackbar } = useSnackbar()
  const {
    field: { onChange },
  } = useController({
    name,
    control,
  })

  function handleChange(e) {
    const files = e.target?.files
    const file = files[0]

    if (!file) {
      enqueueSnackbar('file not found!', { variant: 'error' })
      return
    }

    if (file.size > 300000) {
      enqueueSnackbar('File size must be less than 300kb', { variant: 'error' })
      return
    }

    setReview(URL.createObjectURL(new Blob([file])))
    onChange(file)
  }

  return (
    <Stack spacing={2}>
      <Box>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" name={name} onChange={handleChange} />
        </Button>
      </Box>

      <Box
        sx={{
          width: '100%',
          aspectRatio: '16/9',
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {review || imageUrl ? (
          <Box width="100%" height="100%" component="img" alt="image" src={review || imageUrl} />
        ) : (
          <Box>
            <UploadIcon />
          </Box>
        )}
      </Box>
    </Stack>
  )
}
