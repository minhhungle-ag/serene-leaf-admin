import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'

export function SortField({
  label,
  optionList,
  hideOptionAll = false,
  defaultValue = '',
  onChange,
}) {
  const [value, setValue] = useState(defaultValue)

  function handleChange(e) {
    onChange?.(e.target.value)
    setValue(e.target.value)
  }

  return (
    <FormControl fullWidth size="small">
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={handleChange}>
        {!hideOptionAll && <MenuItem value="">Tất cả</MenuItem>}
        {optionList?.map((option) => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
