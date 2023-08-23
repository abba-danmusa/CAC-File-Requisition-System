import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button, Grid} from '@mui/material';
import { primaryColor, secondaryColor, contrastText } from '../utils/colors';
import Title from './Title';

// eslint-disable-next-line react/prop-types
function Row({ row, initialOpenState, setAuthorize, setOpenBackdrop}) {
  
  const [open, setOpen] = useState(initialOpenState)
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <>
      <TableRow key={row?._id}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            // sx={{backgroundColor: primaryColor}}  
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
          </IconButton>
        </TableCell>
        <TableCell >{row && formatDistanceToNow(new Date(row?.date), {addSuffix: true})}</TableCell>
        <TableCell >{row?.companyName}</TableCell>
        <TableCell >{row?.rcNumber}</TableCell>
        <TableCell >{row?.rrrNumber}</TableCell>
        <TableCell align="right" >{row?.purpose}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{ boxShadow: 5, borderRadius: 2, paddingTop: 2 }}
          >
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                From
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{color: primaryColor}}>Name</TableCell>
                    <TableCell sx={{color: primaryColor}}>Department</TableCell>
                    <TableCell align="right" sx={{color: primaryColor}}>Rank</TableCell>
                    <TableCell align="right" sx={{color: primaryColor}}>ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row?.from.name}
                    </TableCell>
                    <TableCell>{row?.from.department}</TableCell>
                    <TableCell align="right">{row?.from.rank}</TableCell>
                    <TableCell align="right">
                      {row?.from.staffId}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Box p={2}>
              {
                row?.requestStatus.authorization.status === 'pending' && (
                  <>
                    <Button
                      sx={{
                        width: 100,
                        alignSelf: 'center',
                        backgroundColor: primaryColor,
                        ":hover": { backgroundColor: secondaryColor },
                        color: contrastText,
                        margin: 2,
                        // marginTop: 2
                      }}
                      data-id={row?._id}
                      onClick={() => {
                        setOpenBackdrop(true)
                        setAuthorize('AUTHORIZE')
                      }}            
                    >
                      Authorize
                    </Button>
                    <Button
                      sx={{
                        width: 100,
                        alignSelf: 'center',
                        backgroundColor: 'brown',
                        ":hover": { backgroundColor: 'red' },
                        color: contrastText,
                        margin: 2,
                        // marginTop: 2
                      }}
                      onClick={() => {
                        setOpenBackdrop(true)
                        setAuthorize('REJECT')
                      }}
                    >
                      Reject
                    </Button>
                  </>
                ) || (
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item>
                      <Title>Status:</Title>
                    </Grid>
                    <Grid item>
                      <Button
                        disabled
                        size='xs'
                        sx={{
                          backgroundColor: row?.requestStatus.authorization.status == 'accepted' ? primaryColor : 'brown',
                          color: contrastText,
                          borderRadius: 2,
                          ':disabled': { color: contrastText }
                        }}
                      >
                        {
                          row?.requestStatus.authorization.status == 'accepted' ? 'Authorized' : 'Rejected'
                        }
                      </Button>
                    </Grid>
                    <Grid item>
                      <Typography>
                        by: {
                          user._id === row?.authorizedBy?._id ? 
                            `You (${row?.authorizedBy?.name})` :
                            row?.authorizedBy?.name}
                      </Typography>
                    </Grid>
                  </Grid>
                )
              }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default Row