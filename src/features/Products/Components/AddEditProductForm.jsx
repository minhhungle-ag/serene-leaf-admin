import { Box, Stack } from '@mui/material'
import { InputField } from 'components/FormFields/InputField'
import { SelectField } from 'components/FormFields/SelectField'
import { UploadField } from 'components/FormFields/UploadField'
import { categoryOptionList } from 'constants/common'
import { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'

export const AddEditProductForm = forwardRef(({ data, onSubmit }, ref) => {
  const { control, handleSubmit } = useForm({
    defaultValues: data || {
      name: '',
      category: '',
      shortDescription: '',
      description: '',
      imageUrl: '',
      price: '',
      quantity: '',
    },
  })

  const handleFormSubmit = handleSubmit((formValues) => {
    const formData = new FormData()

    formData.append('name', formValues.name)
    formData.append('category', formValues.category)
    formData.append('shortDescription', formValues.shortDescription)
    formData.append('description', formValues.description)
    formData.append('imageUrl', formValues.imageUrl)
    formData.append('price', parseInt(formValues.price))
    formData.append('quantity', parseInt(formValues.quantity))

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
        <InputField name="name" label="Name" control={control} />
      </Box>

      <Box>
        <InputField name="price" label="Price" control={control} />
      </Box>

      <Box>
        <InputField name="quantity" label="Quantity" control={control} />
      </Box>

      <Box>
        <SelectField
          name="category"
          label="Category"
          control={control}
          optionList={categoryOptionList}
        />
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
