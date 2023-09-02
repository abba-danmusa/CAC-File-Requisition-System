import {useState} from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import moment from 'moment'
import { Box, Collapse, IconButton, Skeleton, Typography, Backdrop, CircularProgress, Button, Container, Grid, Paper} from '@mui/material'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import Alert from '../Alert'
// import { primaryColor, contrastText, secondaryColor } from '../utils/colors';

function preventDefault(event) {
  event.preventDefault();
}

// eslint-disable-next-line react/prop-types
export default function Requests({isError, error, isLoading, isSuccess, data}) {
  // eslint-disable-next-line react/prop-types
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Title>Requests</Title>
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
                  <TableCell sx={{color: 'primary.main'}}>Date</TableCell>
                  <TableCell sx={{color: 'primary.main'}}>Company Name</TableCell>
                  <TableCell sx={{color: 'primary.main'}}>RC Number</TableCell>
                  <TableCell sx={{color: 'primary.main'}}>RRR Number</TableCell>
                  <TableCell align="right" sx={{color: 'primary.main'}}>Purpose</TableCell>
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
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
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
            sx={{ boxShadow: 10, borderRadius: 2, paddingTop: 2 }}
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
import { styled } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom'

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[10],
    fontSize: 15
  },
}));

// eslint-disable-next-line react/prop-types
function HorizontalLinearAlternativeLabelStepper({data}) {

  const steps = [
    {
      label: data?.authorization.status,
      date: data?.authorization.date,
      remarks: data?.authorization.remarks
    },
    {
      label: data?.approval.status,
      date: data?.approval.date,
      remarks: data?.approval.remarks
    },
    {
      label: data?.fileRelease.status,
      date: data?.fileRelease.date,
      remarks: data?.fileRelease.remarks
    },
    {
      label: data?.fileReceive.status,
      date: data?.fileReceive.date,
      remarks: data?.fileReceive.remarks
    },
  ]
  
  return (
    <>
      <Title>Request Status</Title>
      {/* eslint-disable-next-line react/prop-types, react/prop-types */}
      {
        data && (
          <p>{`${data?.companyName || ''}`}</p>
        )
      }
      <Box sx={{ width: '100%' }}>
        {
          data && (
            <Stepper activeStep={data?.step} alternativeLabel sx={{boxShadow: 20, paddingTop: 5, paddingBottom: 5, borderRadius: 2}}>
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

                  if (index === 3 && data?.fileRelease.status === 'File Released' && data?.fileReceive.status === 'Awaiting File')
                    return (
                      <LightTooltip
                        title={<ReceiptConfirmation request={data} />}
                        key={index}
                        TransitionComponent={Zoom}
                      >
                        <Step >
                          <StepLabel {...labelProps}>
                            {step.label}
                          </StepLabel>
                        </Step>
                      </LightTooltip>
                    )
                  return (
                    <LightTooltip
                      key={index}
                      title={step.remarks}
                      TransitionComponent={Zoom}
                    >
                      <Step>
                        <StepLabel {...labelProps}>
                          {step.label}
                        </StepLabel>
                      </Step>
                    </LightTooltip>
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

// eslint-disable-next-line react/prop-types
function ReceiptConfirmation({request}) {

  const { mutate, isLoading, isSuccess, data, isError, error } = useConfirmReceipt()

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
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            ':hover': { backgroundColor: 'primary.light', color: 'primary.contrastText' },
          }}
        >Confirm Receipt</Button>
      </Box>
    </>
  )
}
