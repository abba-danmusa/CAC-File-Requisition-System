import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import moment from 'moment'

function preventDefault(event) {
  event.preventDefault();
}

// eslint-disable-next-line react/prop-types
export default function Orders({data}) {

  return (
    <React.Fragment>
      <Title>Recent Requests</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>RC Number</TableCell>
            <TableCell>RRR Number</TableCell>
            <TableCell align="right">Purpose</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* eslint-disable-next-line react/prop-types */}
          {data?.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{moment(row.date).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
              <TableCell>{row.companyName}</TableCell>
              <TableCell>{row.rcNumber}</TableCell>
              <TableCell>{row.rrrNumber}</TableCell>
              <TableCell align="right">{row.purpose}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more requests
      </Link>
    </React.Fragment>
  );
}