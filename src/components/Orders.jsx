import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import moment from 'moment'
import { Skeleton, Typography } from '@mui/material';
import { primaryColor } from '../utils/colors';
import { useGetRequests } from '../hooks/useRequest'

function preventDefault(event) {
  event.preventDefault();
}

// eslint-disable-next-line react/prop-types
export default function Orders() {

  // eslint-disable-next-line react/prop-types
  const {isLoading,isSuccess,data,isError,error} = useGetRequests()

  return (
    <React.Fragment>
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
                </TableRow>
              )
            )
          }
          {
            isSuccess && (
              data?.data?.requests?.map(request => 
                <Row row={request} key={request._id}/>
              )
            )
          }
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more requests
      </Link>
    </React.Fragment>
  );
}

const skeletonRows = [1,2,3,4,5,6,]

// eslint-disable-next-line react/prop-types
const Row = ({row}) => {
  return (
    <TableRow key={row._id}>
      <TableCell>{moment(row?.date).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
      <TableCell>{row?.companyName}</TableCell>
      <TableCell>{row?.rcNumber}</TableCell>
      <TableCell>{row?.rrrNumber}</TableCell>
      <TableCell align="right">{row?.purpose}</TableCell>
    </TableRow>
  )
}