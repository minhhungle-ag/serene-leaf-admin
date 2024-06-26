import { Box, Stack } from '@mui/material'
import { SearchBox } from 'components/FormFields/SearchBox'
import { SortField } from 'components/FormFields/SortField'
import { categoryOptionList } from 'constants/common'

export function ProductFilter({ params, onFilterChange }) {
  function handleSearchChange(value) {
    const newParams = {
      ...params,
      searchKey: value,
    }
    onFilterChange?.(newParams)
  }

  function handleSortOrderChange(value) {
    const newParams = {
      ...params,
      category: value === 'all' ? '' : value,
    }
    onFilterChange?.(newParams)
  }

  return (
    <Box width="100%">
      <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2} p={3}>
        <Box sx={{ flexGrow: 1 }}>
          <Box>
            <SearchBox onSearchChange={(value) => handleSearchChange?.(value)} />
          </Box>
        </Box>

        <Box sx={{ width: 1 / 4 }}>
          <Box>
            <SortField
              hideOptionAll
              defaultValue="all"
              optionList={categoryOptionList}
              onChange={(value) => handleSortOrderChange(value)}
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}
