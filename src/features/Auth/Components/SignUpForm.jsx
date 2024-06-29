import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Divider, IconButton, InputAdornment, Stack } from '@mui/material'
import { AvatarUpload } from 'components/FormFields/AvatarUpload'
import { SelectField } from 'components/FormFields/SelectField'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { InputField } from '../../../components/FormFields/InputField'

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('password Confirmation is required'),
  role: yup.string().required('Role is required'),
  fullName: yup.string().required('Full name is required'),
})

export function SignUpForm({ onSubmit, loading }) {
  const [showPassword, setShowPassword] = useState(false)
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      fullName: '',
      birthday: '',
      address: '',
      role: 'admin',
      imageUrl: '',
    },
    resolver: yupResolver(schema),
  })

  const handleClickShowPassword = () => {
    setShowPassword((x) => !x)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleFormSubmit = handleSubmit((formValues) => {
    console.log('formValues: ', formValues)

    const formData = new FormData()

    formData.append('email', formValues.email)
    formData.append('password', formValues.password)
    formData.append('fullName', formValues.fullName)
    formData.append('birthday', formValues.birthday)
    formData.append('address', formValues.address)
    formData.append('role', formValues.role)
    formData.append('imageUrl', formValues.imageUrl.file)
    onSubmit?.(formData)
  })

  return (
    <Stack component="form" noValidate spacing={3} onSubmit={handleFormSubmit}>
      <Stack justifyContent="center" alignItems="center">
        <AvatarUpload name="imageUrl" control={control} />
      </Stack>

      <Box>
        <InputField required name="email" control={control} label="Email" />
      </Box>

      <Box>
        <InputField
          required
          control={control}
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box>
        <InputField
          required
          control={control}
          type={showPassword ? 'text' : 'password'}
          name="passwordConfirmation"
          label="password Confirmation"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box>
        <InputField required name="fullName" control={control} label="Full name" />
      </Box>
      <Box>
        <InputField name="address" control={control} label="Address" />
      </Box>

      <Box>
        <InputField name="birthday" control={control} label="Birthday" />
      </Box>

      <Box>
        <SelectField
          name="role"
          control={control}
          label="Role"
          disabled
          optionList={[
            {
              label: 'Admin',
              value: 'admin',
            },
            {
              label: 'Customer',
              value: 'customer',
            },
          ]}
        />
      </Box>

      <Divider />

      <Stack spacing={2}>
        <Box>
          <LoadingButton loading={loading} type="submit" fullWidth variant="contained">
            Submit
          </LoadingButton>
        </Box>
        <Box>
          <LoadingButton loading={loading} fullWidth variant="outlined">
            Cancel
          </LoadingButton>
        </Box>
      </Stack>
    </Stack>
  )
}
