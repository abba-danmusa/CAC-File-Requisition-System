import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import { Skeleton, Typography } from '@mui/material';
import { primaryColor } from '../utils/colors';
import { useGetAuthRequests } from '../hooks/useRequest';
import Row from './Row';

function PendingAuthorizations() {
  
  const { isLoading, isSuccess, isError, data, error } = useGetAuthRequests()

  return (
    <>
      <Title>Recent Requests</Title>
      {
        isError && (
          <Typography color="text.secondary" sx={{ flex: 1 }} align='center'>
            {error.response?.data?.message || error?.message}
          </Typography>
        )
      }
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell sx={{color: primaryColor}}>Date</TableCell>
            <TableCell sx={{color: primaryColor}}>Company Name</TableCell>
            <TableCell sx={{color: primaryColor}}>RC Number</TableCell>
            <TableCell sx={{color: primaryColor}}>RRR Number</TableCell>
            <TableCell align="right" sx={{color: primaryColor}}>Purpose</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* eslint-disable-next-line react/prop-types */}
          {
            isLoading && (
              skeletonRows.map(num => 
                <TableRow key={num}>
                  <TableCell><Skeleton height={25}/></TableCell>
                  <TableCell><Skeleton height={25}/></TableCell>
                  <TableCell><Skeleton height={25}/></TableCell>
                  <TableCell><Skeleton height={25}/></TableCell>
                  <TableCell><Skeleton height={25}/></TableCell>
                  <TableCell><Skeleton height={25}/></TableCell>
                </TableRow>
              )
            )
          }
          {
            isSuccess && (
              data?.data?.requests?.map(request => 
                <Row row={request} key={request?._id} initialOpenState={false}/>
              )
            )
          }
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={e=> e.preventDefault()} sx={{ mt: 3 }}>
        See more requests
      </Link>
    </>
  )
}

const skeletonRows = [1,2,3,4,5]

export default PendingAuthorizations