import {useState} from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import moment from 'moment'
import { Box, Collapse, IconButton, Skeleton, Typography, Backdrop, CircularProgress } from '@mui/material';
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
                <Row row={request} key={request._id} isLoading={isLoading} />
              )
            )
          }
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more requests
      </Link>
    </>
  );
}

const skeletonRows = [1,2,3,4,5,6,]

// eslint-disable-next-line react/prop-types
const Row = ({ row }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow key={row._id}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            // sx={{backgroundColor: primaryColor}}  
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
          </IconButton>
        </TableCell>
        <TableCell>{moment(row?.date).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
        <TableCell>{row?.companyName}</TableCell>
        <TableCell>{row?.rcNumber}</TableCell>
        <TableCell>{row?.rrrNumber}</TableCell>
        <TableCell align="right">{row?.purpose}</TableCell>
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
              {/* <Typography variant="h6" gutterBottom component="div">
                Status
              </Typography> */}
              <HorizontalLinearAlternativeLabelStepper data={row}/>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { formatDistanceToNow } from 'date-fns'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

// eslint-disable-next-line react/prop-types
function HorizontalLinearAlternativeLabelStepper({data}) {

  const steps = [
    {
      label: data?.authorization.status,
      date: data?.authorization.date
    },
    {
      label: data?.approval.status,
      date: data?.approval.date
    },
    {
      label: data?.fileRelease.status,
      date: data?.fileRelease.date
    },
    {
      label: data?.fileReceive.status,
      date: data?.fileReceive.date
    },
  ]
  
  return (
    <>
      <Title>Request Status</Title>
      {/* eslint-disable-next-line react/prop-types, react/prop-types */}
      {
        data && (
          <p>{`Company Name: ${data?.companyName || ''}`}</p>
        )
      }
      <Box sx={{ width: '100%' }}>
        {
          data && (
            <Stepper activeStep={data?.step} alternativeLabel sx={{boxShadow: 1, padding: 2, borderRadius: 2}}>
              {
                steps?.map((step, index) => {
                  const labelProps = {};
                  const labelRegex = /(Declined|Not|Disapproved)/
                  if (labelRegex.test(step.label)) {                 
                    labelProps.error = true
                  }
                  labelProps.optional = (
                    <Typography variant="caption" color={labelProps.error ? 'error' : 'primary'}>
                      {step.date? `${step.date && formatDistanceToNow(new Date(step.date))} ago` : null}
                    </Typography>
                  )

                  if (index === 3 && data?.data?.request?.[0].fileReceive.status === 'accepted')
                    return (
                      <LightTooltip
                        title={<ReceiptConfirmation request={data?.data?.request?.[0] } />}
                        key={index}
                      >
                        <Step >
                          <StepLabel {...labelProps}>
                            {step.label}
                          </StepLabel>
                        </Step>
                      </LightTooltip>
                    )
                  return (
                    <Step key={index}>
                      <StepLabel {...labelProps}>
                        {step.label}
                      </StepLabel>
                    </Step>
                  )
                })
              }
            </Stepper>
          ) ||
          !(data) && (
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              The status of your file requests shows here
            </Typography>
          )
        }
    </Box>
    </>
  );
}

function ReceiptConfirmation({request}) {

  const {mutate, isLoading, isSuccess, data, isError, error} = useConfirmReceipt()

  const confirmReceipt = e => {
    mutate({id: e.target.dataset.id})
  }

  return (
    <>
      {
        isError && (
          <Alert
            severity={'error'}
            message={data?.response?.data?.message ||
              error?.message}
          />
        )
      }
      {
        isSuccess && (
          <Alert message={data?.data?.message} severity={'success'}/>
        )
      }
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        width={200}
        height={150}
        sx={{ borderRadius: 3, alignContent: 'center', padding: 1 }}
      >
        <Typography color="text.primary" sx={{ flex: 1 }}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          If you have received the file please confirm by clicking on the 'Confirm Button' below.
        </Typography>
        <Button
          onClick={confirmReceipt}
          data-id={request._id}
          sx={{
            fontSize: '12px',
            backgroundColor: primaryColor,
            color: contrastText,
            ':hover': { backgroundColor: secondaryColor, color: contrastText },
          }}
        >Confirm Receipt</Button>
      </Box>
    </>
  )
}
