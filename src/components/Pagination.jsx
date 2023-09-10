import { Pagination, Stack } from "@mui/material"

// eslint-disable-next-line react/prop-types
function PaginationItem({ pages, page, changePage }) {

  return (
    <Stack
      spacing={2}
      sx={{ marginLeft: 'auto', marginBottom: 2, justifyContent: 'flex-end' }} alignItems={'flex-end'}
    >
      <Pagination
        count={pages}
        page={page}
        color='primary'
        onChange={changePage}
      />
    </Stack>
  )
}

export default PaginationItem