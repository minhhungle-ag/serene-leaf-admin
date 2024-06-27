import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'

export const InputField = ({
  name,
  control,
  multiline = false,
  rows = 3,
  InputProps,
  InputLabelProps,
  label,
  placeholder,
  required,
  ...inputProps
}) => {
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { invalid, error },
  } = useController({
    control,
    name,
  })

  return (
    <TextField
      required={required}
      fullWidth
      size="small"
      name={name}
      error={invalid}
      multiline={multiline}
      rows={rows}
      placeholder={placeholder}
      label={label}
      inputRef={ref}
      onChange={onChange}
      onBlur={onBlur}
      value={value || ''}
      helperText={error?.message}
      InputProps={InputProps}
      InputLabelProps={InputLabelProps}
      inputProps={inputProps}
    />
  )
}
