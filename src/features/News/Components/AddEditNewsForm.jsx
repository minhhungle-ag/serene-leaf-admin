import { Box, Stack } from '@mui/material'
import { InputField } from 'components/FormFields/InputField'
import { UploadField } from 'components/FormFields/UploadField'
import { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'

export const AddEditNewsForm = forwardRef(({ data, onSubmit }, ref) => {
  const { control, handleSubmit } = useForm({
    defaultValues: data || {
      title: '',
      author: ' ',
      shortDescription: '',
      description: '',
      imageUrl: '',
    },
  })

  const handleFormSubmit = handleSubmit((formValues) => {
    const formData = new FormData()

    formData.append('title', formValues.title)
    formData.append('author', formValues.author)
    formData.append('shortDescription', formValues.shortDescription)
    formData.append('description', formValues.description)
    formData.append('imageUrl', formValues.imageUrl)

    console.log('formData: ', formData)

    onSubmit(formData)
  })

  useImperativeHandle(ref, () => {
    return {
      submit() {
        handleFormSubmit()
      },
    }
  })

  return (
    <Stack component="form" noValidate onSubmit={handleFormSubmit} spacing={3}>
      <Box>
        <InputField name="author" label="Author" control={control} />
      </Box>

      <Box>
        <InputField name="title" label="Title" control={control} />
      </Box>

      <Box
        sx={{
          '& *': {
            whiteSpace: 'pre-wrap',
          },
        }}
      >
        <InputField
          multiline
          rows={5}
          name="shortDescription"
          label="Short Description"
          control={control}
        />
      </Box>

      <Box
        sx={{
          '& *': {
            whiteSpace: 'pre-wrap',
          },
        }}
      >
        <InputField multiline rows={15} name="description" label="Description" control={control} />
      </Box>

      <Box width={2 / 3}>
        <UploadField
          name="imageUrl"
          label="Image Url"
          control={control}
          imageUrl={data?.imageUrl || ''}
        />
      </Box>
    </Stack>
  )
})
