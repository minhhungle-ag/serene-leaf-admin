import { Box, Button, Divider, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { InputField } from '../../../components/FormFields/InputField'

export function SignUpForm() {
  const { control } = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      birthday: '',
      permissions: 'admin',
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

      <Box>
        <InputField name="confirmPassword" control={control} label="ConfirmPassword" />
      </Box>

      <Box>
        <InputField name="fullName" control={control} label="Full name" />
      </Box>

      <Box>
        <InputField name="birthday" control={control} label="Birthday" />
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
