import { Box, Button, Divider, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { InputField } from '../../../components/FormFields/InputField'

export const LoginForm = () => {
  const { control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  return (
    <Stack component="form" noValidate spacing={3}>
      <Box>
        <InputField name="email" control={control} label="Email" />
      </Box>

      <Box>
        <InputField name="password" control={control} label="Password" />
      </Box>

      <Divider />

      <Stack spacing={2}>
        <Box>
          <Button type="submit" fullWidth variant="contained">
            Submit
          </Button>
        </Box>
        <Box>
          <Button fullWidth variant="outlined">
            Cancel
          </Button>
        </Box>
      </Stack>
    </Stack>
  )
}
