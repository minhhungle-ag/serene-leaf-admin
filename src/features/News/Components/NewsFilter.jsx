import { Box, Stack } from '@mui/material'
import { SortField } from '../../../components/FormFields/SortField'
import { SearchBox } from '../../../components/FormFields/SearchBox'

const optionList = [
  {
    label: 'ASC',
    value: 'asc',
  },
  {
    label: 'DESC',
    value: 'desc',
  },
]

export function NewsFilter({ params, onFilterChange }) {
  function handleSearchChange(value) {
    const newParams = {
      ...params,
      searchKey: value,
    }
    onFilterChange(newParams)
  }

  function handleSortOrderChange(value) {
    const newParams = {
      ...params,
      order: value,
    }
    onFilterChange(newParams)
  }

  return (
    <Box width="100%">
      <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2} p={3}>
        <Box sx={{ width: 1 / 2 }}>
          <Box>
            <SearchBox onSearchChange={(value) => handleSearchChange?.(value)} />
          </Box>
        </Box>

        <Box sx={{ width: 1 / 4 }}>
          <Box>
            <SortField
              defaultValue="asc"
              hideOptionAll
              optionList={optionList}
              onChange={(value) => handleSortOrderChange(value)}
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}
